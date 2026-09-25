const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Import Polyline
if (!code.includes('Polyline')) {
  code = code.replace(/import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';/, 
    "import { MapContainer, TileLayer, Marker, useMap, ZoomControl, Polyline } from 'react-leaflet';");
}

// 2. Add States
const stateTarget = `const [rainStatus, setRainStatus] = useState('no_rain');`;
const stateReplacement = `const [rainStatus, setRainStatus] = useState('no_rain');
  const [navigationDestination, setNavigationDestination] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [transitRouteData, setTransitRouteData] = useState(null);
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);`;
if (!code.includes('navigationDestination')) {
  code = code.replace(stateTarget, stateReplacement);
}

// 3. Add Routing useEffect
const effectTarget = `  // --- Browser History Management for Modals ---`;
const effectReplacement = `
  React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && userLocation) {
      const fetchRouteData = async () => {
        setIsRoutingLoading(true);
        try {
          // Walking Route
          const osrmUrl = \`https://router.project-osrm.org/route/v1/foot/\${userLocation[1]},\${userLocation[0]};\${navigationDestination.lng},\${navigationDestination.lat}?steps=true&geometries=geojson&overview=full\`;
          const response = await fetch(osrmUrl);
          const data = await response.json();
          
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRouteData({
              coordinates,
              distance: route.distance,
              duration: route.duration,
              steps: route.legs[0].steps
            });
          } else {
            setRouteData({
              coordinates: [userLocation, [navigationDestination.lat, navigationDestination.lng]],
              distance: 0, duration: 0, steps: []
            });
          }

          // Transit Route Simulation
          let nearestOriginStation = null;
          let minOriginDist = Infinity;
          let nearestDestStation = null;
          let minDestDist = Infinity;
          
          const stations = [...allMetros, ...allTrains];
          
          stations.forEach(station => {
            const distToUser = Math.sqrt(Math.pow(station.lat - userLocation[0], 2) + Math.pow(station.lng - userLocation[1], 2));
            if (distToUser < minOriginDist) {
              minOriginDist = distToUser;
              nearestOriginStation = station;
            }
            
            const distToDest = Math.sqrt(Math.pow(station.lat - navigationDestination.lat, 2) + Math.pow(station.lng - navigationDestination.lng, 2));
            if (distToDest < minDestDist) {
              minDestDist = distToDest;
              nearestDestStation = station;
            }
          });

          setTransitRouteData({
            originStation: nearestOriginStation,
            destStation: nearestDestStation,
            walkToOriginDist: (minOriginDist * 111).toFixed(1),
            walkToDestDist: (minDestDist * 111).toFixed(1),
            trainName: nearestOriginStation?.type === 'metro' ? 'Blue Line Metro' : '31914 - Sealdah Local',
            trainDuration: Math.floor(Math.random() * 30) + 15,
            departureTime: new Date(Date.now() + 5 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          });

        } catch (error) {
          console.error("Routing error:", error);
        }
        setIsRoutingLoading(false);
      };
      
      fetchRouteData();
    }
  }, [isDirectionPopupOpen, navigationDestination, userLocation]);

  // --- Browser History Management for Modals ---`;
if (!code.includes('fetchRouteData()')) {
  code = code.replace(effectTarget, effectReplacement);
}

// 4. Update handleNavigateClick
const oldNavigate = `        setIsDirectionPopupOpen(true);`;
const newNavigate = `        setNavigationDestination(selectedLocation);
        setIsDirectionPopupOpen(true);`;
code = code.replace(/setIsDirectionPopupOpen\(true\);/g, newNavigate);

// 5. Update MapContainer to include Polyline
const mapTarget = `<LiveTracker isFollowing={isFollowing} position={userLocation} />`;
const mapReplacement = `<LiveTracker isFollowing={isFollowing} position={userLocation} />
          {isDirectionPopupOpen && navigationDestination && routeData && activeDirectionMode === 'footprints' && (
            <Polyline positions={routeData.coordinates} color="#3b82f6" weight={5} opacity={0.8} />
          )}
          {isDirectionPopupOpen && navigationDestination && transitRouteData && activeDirectionMode === 'train' && transitRouteData.originStation && transitRouteData.destStation && (
            <>
              <Polyline positions={[userLocation, [transitRouteData.originStation.lat, transitRouteData.originStation.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
              <Polyline positions={[[transitRouteData.originStation.lat, transitRouteData.originStation.lng], [transitRouteData.destStation.lat, transitRouteData.destStation.lng]]} color="#16a085" weight={5} />
              <Polyline positions={[[transitRouteData.destStation.lat, transitRouteData.destStation.lng], [navigationDestination.lat, navigationDestination.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
            </>
          )}`;
if (!code.includes('activeDirectionMode === \'footprints\' && (')) {
  code = code.replace(mapTarget, mapReplacement);
}

// 6. Update Direction Popup UI logic
// Find the entire {isDirectionPopupOpen && ( ... )} block to carefully modify the input value and the list

// Change defaultValue to value for the input
code = code.replace(
  `<input type="text" className="direction-input" placeholder="Choose destination" />`,
  `<input type="text" className="direction-input" placeholder="Choose destination" value={navigationDestination ? navigationDestination.name : ''} readOnly={!!navigationDestination} />`
);

// We will inject the UI inside the direction list area.
const listStartRegex = /\{\/\* List \*\/\}([\s\S]*?)<\/div>\s*<\/div>\s*\)\}/;
const newUI = `{/* List */}
            {navigationDestination ? (
              <div className="navigation-details-panel">
                {isRoutingLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Calculating route...</div>
                ) : activeDirectionMode === 'footprints' && routeData ? (
                  <div className="walk-directions">
                    <div className="walk-summary">
                      <div className="walk-time">{Math.ceil(routeData.duration / 60)} min <span className="walk-dist">({(routeData.distance / 1000).toFixed(1)} km)</span></div>
                      <div className="walk-warning">Use caution – walking directions may not always reflect real-world conditions.</div>
                    </div>
                    <div className="walk-steps">
                      <div className="step-item">
                        <div className="step-icon-col"><div className="dot-icon blue"></div></div>
                        <div className="step-content border-b">Your location</div>
                      </div>
                      {routeData.steps.map((step, idx) => (
                        <div className="step-item" key={idx}>
                          <div className="step-icon-col">
                            {step.maneuver.type.includes('turn') || step.maneuver.modifier ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                            )}
                          </div>
                          <div className="step-content border-b">
                            <div className="step-instruction">{step.maneuver.instruction || \`Head \${step.maneuver.modifier || 'straight'}\`}</div>
                            <div className="step-distance">{step.distance} m</div>
                          </div>
                        </div>
                      ))}
                      <div className="step-item">
                        <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                        <div className="step-content border-b">{navigationDestination.name}</div>
                      </div>
                    </div>
                    <div className="start-btn-container">
                      <button className="nav-start-btn"><svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" /></svg> Start</button>
                    </div>
                  </div>
                ) : activeDirectionMode === 'train' && transitRouteData ? (
                  <div className="transit-directions">
                    <div className="transit-summary">
                      <div className="transit-time">{Math.ceil((parseFloat(transitRouteData.walkToOriginDist) + parseFloat(transitRouteData.walkToDestDist))*15) + transitRouteData.trainDuration} min</div>
                      <div className="transit-depart">Leave {transitRouteData.departureTime}</div>
                    </div>
                    <div className="transit-steps">
                      <div className="step-item">
                        <div className="step-icon-col"><div className="dot-icon blue"></div><div className="dotted-line"></div></div>
                        <div className="step-content">
                          <div className="step-title">Your location</div>
                          <div className="step-instruction" style={{marginTop: '12px'}}><Footprints size={14}/> Walk {(transitRouteData.walkToOriginDist * 15).toFixed(0)} min ({transitRouteData.walkToOriginDist} km)</div>
                        </div>
                      </div>
                      <div className="step-item">
                        <div className="step-icon-col"><div className="train-circle-icon"><Train size={14} color="white"/></div><div className="solid-line blue-line"></div></div>
                        <div className="step-content">
                          <div className="step-title">{transitRouteData.originStation?.name || 'Nearest Station'}</div>
                          <div className="step-pill">{transitRouteData.trainName}</div>
                          <div className="step-subtitle">On time • Platform 2</div>
                          <div className="step-detail">Ride {transitRouteData.trainDuration} min</div>
                        </div>
                      </div>
                      <div className="step-item">
                        <div className="step-icon-col"><div className="train-circle-icon"><Train size={14} color="white"/></div><div className="dotted-line"></div></div>
                        <div className="step-content">
                          <div className="step-title">{transitRouteData.destStation?.name || 'Destination Station'}</div>
                          <div className="step-instruction" style={{marginTop: '12px'}}><Footprints size={14}/> Walk {(transitRouteData.walkToDestDist * 15).toFixed(0)} min ({transitRouteData.walkToDestDist} km)</div>
                        </div>
                      </div>
                      <div className="step-item">
                        <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                        <div className="step-content">{navigationDestination.name}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Select Walk or Train mode for directions</div>
                )}
              </div>
            ) : (
$1
            )}
          </div>
        )}
`;

code = code.replace(listStartRegex, newUI);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully injected Navigation UI logic to MapPage");
