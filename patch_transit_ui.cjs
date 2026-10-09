const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex2 = /\(\(\) => \{\r?\n\s*const activeRoute = activeDirectionMode === 'train' \? transitRouteData : metroRouteData;[\s\S]*?\}\)\(\)/;

const replacement2 = `(() => {
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

                    const renderStep = (step, idx, isLastInPhase) => {
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
                              <div className="step-instruction" style={{marginTop: '4px', fontSize: '13px', color: '#1a73e8', fontWeight: 500}}>Walk {originWalkMins} min ({(activeRoute.walkToOriginMeters / 1000).toFixed(1)} km) to {activeRoute.originStation?.name}</div>
                            </div>
                          </div>
                          
                          {activeRoute.walkToOriginSteps && activeRoute.walkToOriginSteps.map((step, idx) => renderStep(step, idx, false))}
                          
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
                              <div className="step-instruction" style={{marginTop: '4px', fontSize: '13px', color: '#1a73e8', fontWeight: 500}}>Walk {destWalkMins} min ({(activeRoute.walkToDestMeters / 1000).toFixed(1)} km)</div>
                            </div>
                          </div>

                          {activeRoute.walkToDestSteps && activeRoute.walkToDestSteps.map((step, idx) => renderStep(step, idx, false))}
                          
                          <div className="step-item" style={{marginTop: '10px'}}>
                            <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                            <div className="step-content" style={{borderBottom: 'none'}}>{isRouteSwapped ? (userLocation ? "Current Location" : ".....") : navigationDestination.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()`;

if (regex2.test(code)) {
    code = code.replace(regex2, replacement2);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced UI logic.");
} else {
    console.log("Could not find regex2!");
}
