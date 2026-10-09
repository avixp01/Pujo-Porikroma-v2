const fs = require('fs');
let lines = fs.readFileSync('src/components/MapPage.jsx', 'utf8').split('\n');

// 1. Calculate Route Replacement
const newCalc = `          // Helper to fetch OSRM foot route
          const fetchFootRoute = async (sLat, sLng, dLat, dLng) => {
            const url = \`https://router.project-osrm.org/route/v1/foot/\${sLng},\${sLat};\${dLng},\${dLat}?steps=true&geometries=geojson&overview=full\`;
            try {
              const res = await fetch(url);
              const data = await res.json();
              if (data.routes && data.routes.length > 0) return data.routes[0];
            } catch (e) {}
            return null;
          };

          const calculateRouteAsync = async (stationList, routeName) => {
            let nearestOrigin = null;
            let minOriginDist = Infinity;
            let nearestDest = null;
            let minDestDist = Infinity;
            
            const getDist = (lat1, lon1, lat2, lon2) => {
              const R = 6371;
              const dLat = (lat2-lat1)*Math.PI/180;
              const dLon = (lon2-lon1)*Math.PI/180;
              const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
              return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            };

            const directDist = getDist(startLat, startLng, endLat, endLng);
            
            stationList.forEach(station => {
              const distToUser = getDist(station.lat, station.lng, startLat, startLng);
              if (distToUser < minOriginDist) { minOriginDist = distToUser; nearestOrigin = station; }
              const distToDest = getDist(station.lat, station.lng, endLat, endLng);
              if (distToDest < minDestDist) { minDestDist = distToDest; nearestDest = station; }
            });

            if (!nearestOrigin || !nearestDest || nearestOrigin.id === nearestDest.id || directDist < 1.5) {
               return { isPureWalk: true };
            }

            const routeToOrigin = await fetchFootRoute(startLat, startLng, nearestOrigin.lat, nearestOrigin.lng);
            const routeToDest = await fetchFootRoute(nearestDest.lat, nearestDest.lng, endLat, endLng);

            const walkToOriginMeters = routeToOrigin ? routeToOrigin.distance : minOriginDist * 1000;
            const walkToDestMeters = routeToDest ? routeToDest.distance : minDestDist * 1000;
            const walkToOriginSteps = routeToOrigin ? routeToOrigin.legs[0].steps : [];
            const walkToDestSteps = routeToDest ? routeToDest.legs[0].steps : [];
            const walkToOriginCoords = routeToOrigin ? routeToOrigin.geometry.coordinates.map(c => [c[1], c[0]]) : [[startLat, startLng], [nearestOrigin.lat, nearestOrigin.lng]];
            const walkToDestCoords = routeToDest ? routeToDest.geometry.coordinates.map(c => [c[1], c[0]]) : [[nearestDest.lat, nearestDest.lng], [endLat, endLng]];

            return {
              isPureWalk: false,
              originStation: nearestOrigin,
              destStation: nearestDest,
              walkToOriginMeters,
              walkToDestMeters,
              walkToOriginSteps,
              walkToDestSteps,
              walkToOriginCoords,
              walkToDestCoords,
              trainName: routeName,
              trainDuration: Math.max(2, Math.ceil(getDist(nearestOrigin.lat, nearestOrigin.lng, nearestDest.lat, nearestDest.lng) * 1.5)),
              departureTime: new Date(Date.now() + 5*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
          };

          const transitResult = await calculateRouteAsync(allTrains, '31914 - Sealdah Local');
          setTransitRouteData(transitResult);
          
          const metroResult = await calculateRouteAsync(allMetros, 'Blue Line Metro');
          setMetroRouteData(metroResult);`;

let calcStart = -1;
let calcEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Train Route Simulation')) calcStart = i;
  if (calcStart !== -1 && i > calcStart && lines[i].includes('setMetroRouteData(calculateRoute(')) {
    calcEnd = i;
    break;
  }
}

if (calcStart !== -1 && calcEnd !== -1) {
  lines.splice(calcStart, calcEnd - calcStart + 1, newCalc);
} else {
  console.log("Could not find calculateRoute block");
  process.exit(1);
}

// 2. UI Replacement
const newUI = `                  (() => {
                    const activeRoute = activeDirectionMode === 'train' ? transitRouteData : metroRouteData;
                    if (!activeRoute) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading route...</div>;
                    
                    if (activeRoute.isPureWalk) {
                       return (
                         <div style={{ padding: '20px', textAlign: 'center', color: '#ea4335' }}>
                           Destination is very close. Please use the Walking tab for a direct route.
                         </div>
                       );
                    }

                    const originWalkMins = Math.ceil((activeRoute.walkToOriginMeters / 1.2) / 60);
                    const destWalkMins = Math.ceil((activeRoute.walkToDestMeters / 1.2) / 60);
                    const totalMins = originWalkMins + destWalkMins + activeRoute.trainDuration;

                    const renderStep = (step, idx) => {
                        const maneuver = step.maneuver || {};
                        const { type = '', modifier = '' } = maneuver;
                        let text = 'Head straight';
                        if (type === 'turn') text = modifier ? \`Turn \${modifier}\` : 'Turn';
                        else if (type === 'new name' || type === 'continue') text = modifier ? \`Continue \${modifier}\` : 'Continue straight';
                        else if (type === 'depart') text = \`Head \${modifier || 'straight'}\`;
                        else if (type === 'arrive') text = 'Arrive';
                        else if (modifier) text = \`Head \${modifier}\`;
                        
                        if (step.name && step.name !== '') text += \` onto \${step.name}\`;
                        text = text.charAt(0).toUpperCase() + text.slice(1);

                        let transform = 'rotate(0deg)';
                        const lowerText = text.toLowerCase();
                        if (lowerText.includes('uturn') || lowerText.includes('u-turn') || modifier === 'uturn') transform = 'rotate(180deg)';
                        else if (lowerText.includes('left') || modifier.includes('left')) transform = 'rotate(-90deg)';
                        else if (lowerText.includes('right') || modifier.includes('right')) transform = 'rotate(90deg)';

                        return (
                          <div className="step-item" key={idx}>
                            <div className="step-icon-col">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform }}>
                                <path d="M12 19V5M5 12l7-7 7 7"/>
                              </svg>
                            </div>
                            <div className="step-content border-b">
                              <div className="step-instruction">{text}</div>
                              <div className="step-distance">{step.distance >= 1000 ? (step.distance / 1000).toFixed(1) + ' km' : Math.round(step.distance || 0) + ' m'}</div>
                            </div>
                          </div>
                        );
                    };

                    return (
                      <div className="transit-directions">
                        <div className="transit-summary">
                          <div className="transit-time">
                            {totalMins >= 60 ? \`\${Math.floor(totalMins / 60)} hr \${totalMins % 60} min\` : \`\${totalMins} min\`}
                          </div>
                          <div className="transit-depart">Leave {activeRoute.departureTime}</div>
                        </div>
                        <div className="transit-steps walk-steps">
                          
                          <div className="step-item" style={{marginBottom: '-5px'}}>
                            <div className="step-icon-col"><div className="dot-icon blue"></div></div>
                            <div className="step-content">
                              <div className="step-title">{isRouteSwapped ? navigationDestination.name : (userLocation ? "Current Location" : ".....")}</div>
                              <div className="step-instruction" style={{marginTop: '4px', fontSize: '13px', color: '#1a73e8', fontWeight: 500}}><Footprints size={14}/> Walk {originWalkMins} min ({(activeRoute.walkToOriginMeters / 1000).toFixed(1)} km) to {activeRoute.originStation?.name}</div>
                            </div>
                          </div>
                          
                          {activeRoute.walkToOriginSteps && activeRoute.walkToOriginSteps.map((step, idx) => renderStep(step, idx))}
                          
                          <div className="step-item" style={{marginTop: '10px', marginBottom: '10px'}}>
                            <div className="step-icon-col"><div className="train-circle-icon">{activeDirectionMode === 'metro' ? <TramFront size={14} color="white"/> : <Train size={14} color="white"/>}</div></div>
                            <div className="step-content">
                              <div className="step-title">{activeRoute.originStation?.name}</div>
                              <div className="step-pill" style={{ backgroundColor: activeDirectionMode === 'metro' ? '#ede9fe' : '#e0e7ff', color: activeDirectionMode === 'metro' ? '#5b21b6' : '#3730a3' }}>{activeRoute.trainName}</div>
                              <div className="step-detail">Ride {activeRoute.trainDuration} min</div>
                            </div>
                          </div>
                          
                          <div className="step-item" style={{marginBottom: '-5px'}}>
                            <div className="step-icon-col"><div className="train-circle-icon" style={{background: 'transparent', border: '2px solid #5b21b6'}}>{activeDirectionMode === 'metro' ? <TramFront size={14} color="#5b21b6"/> : <Train size={14} color="#3730a3"/>}</div></div>
                            <div className="step-content">
                              <div className="step-title">{activeRoute.destStation?.name}</div>
                              <div className="step-instruction" style={{marginTop: '4px', fontSize: '13px', color: '#1a73e8', fontWeight: 500}}><Footprints size={14}/> Walk {destWalkMins} min ({(activeRoute.walkToDestMeters / 1000).toFixed(1)} km) to destination</div>
                            </div>
                          </div>

                          {activeRoute.walkToDestSteps && activeRoute.walkToDestSteps.map((step, idx) => renderStep(step, idx))}
                          
                          <div className="step-item" style={{marginTop: '10px'}}>
                            <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                            <div className="step-content" style={{borderBottom: 'none'}}>{isRouteSwapped ? (userLocation ? "Current Location" : ".....") : navigationDestination.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()`;

let uiStart = -1;
let uiEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('(() => {') && lines[i+1] && lines[i+1].includes("activeRoute = activeDirectionMode === 'train' ? transitRouteData : metroRouteData;")) {
    uiStart = i;
  }
  if (uiStart !== -1 && i > uiStart && lines[i].includes('})()') && lines[i+1] && lines[i+1].includes(') : (')) {
    uiEnd = i;
    break;
  }
}

if (uiStart !== -1 && uiEnd !== -1) {
  lines.splice(uiStart, uiEnd - uiStart + 1, newUI);
} else {
  console.log("Could not find UI block boundaries");
  process.exit(1);
}

fs.writeFileSync('src/components/MapPage.jsx', lines.join('\n'), 'utf8');
console.log('Fixed successfully');
