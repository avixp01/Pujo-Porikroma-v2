const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Update tabs
const oldTabs = `<div className="nav-bottom-tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', gap: '24px' }}>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'footprints' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('footprints')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'footprints' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'footprints' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Footprints size={24} />
                  </button>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'train' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('train')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'train' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'train' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Train size={24} />
                  </button>
                </div>`;

const newTabs = `<div className="nav-bottom-tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', gap: '16px' }}>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'footprints' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('footprints')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'footprints' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'footprints' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Footprints size={24} />
                  </button>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'metro' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('metro')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'metro' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'metro' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <TramFront size={24} />
                  </button>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'train' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('train')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'train' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'train' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Train size={24} />
                  </button>
                </div>`;
code = code.replace(oldTabs, newTabs);

// Update render block for 'train' to ALSO handle 'metro'
const oldTrainBlockRegex = /\) : activeDirectionMode === 'train' && transitRouteData \? \([\s\S]*?\) : \(/;
const trainBlockCode = code.match(oldTrainBlockRegex)[0];

const activeRouteDataHelper = `) : (activeDirectionMode === 'train' || activeDirectionMode === 'metro') ? (
                  (() => {
                    const activeRoute = activeDirectionMode === 'train' ? transitRouteData : metroRouteData;
                    if (!activeRoute) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading route...</div>;
                    return (
                      <div className="transit-directions">
                        <div className="transit-summary">
                          <div className="transit-time">
                            {(() => {
                              const totalMins = Math.ceil((parseFloat(activeRoute.walkToOriginDist) + parseFloat(activeRoute.walkToDestDist))*15) + activeRoute.trainDuration;
                              return totalMins >= 60 ? \`\${Math.floor(totalMins / 60)} hr \${totalMins % 60} min\` : \`\${totalMins} min\`;
                            })()}
                          </div>
                          <div className="transit-depart">Leave {activeRoute.departureTime}</div>
                        </div>
                        <div className="transit-steps">
                          <div className="step-item">
                            <div className="step-icon-col"><div className="dot-icon blue"></div><div className="dotted-line"></div></div>
                            <div className="step-content">
                              <div className="step-title">Your location</div>
                              <div className="step-instruction" style={{marginTop: '12px'}}><Footprints size={14}/> Walk {(activeRoute.walkToOriginDist * 15).toFixed(0)} min ({activeRoute.walkToOriginDist} km)</div>
                            </div>
                          </div>
                          <div className="step-item">
                            <div className="step-icon-col"><div className="train-circle-icon">{activeDirectionMode === 'metro' ? <TramFront size={14} color="white"/> : <Train size={14} color="white"/>}</div><div className="solid-line blue-line"></div></div>
                            <div className="step-content">
                              <div className="step-title">{activeRoute.originStation?.name || 'Nearest Station'}</div>
                              <div className="step-pill" style={{ backgroundColor: activeDirectionMode === 'metro' ? '#ede9fe' : '#e0e7ff', color: activeDirectionMode === 'metro' ? '#5b21b6' : '#3730a3' }}>{activeRoute.trainName}</div>
                              <div className="step-subtitle">On time • Platform 2</div>
                              <div className="step-detail">Ride {activeRoute.trainDuration} min</div>
                            </div>
                          </div>
                          <div className="step-item">
                            <div className="step-icon-col"><div className="train-circle-icon">{activeDirectionMode === 'metro' ? <TramFront size={14} color="white"/> : <Train size={14} color="white"/>}</div><div className="dotted-line"></div></div>
                            <div className="step-content">
                              <div className="step-title">{activeRoute.destStation?.name || 'Destination Station'}</div>
                              <div className="step-instruction" style={{marginTop: '12px'}}><Footprints size={14}/> Walk {(activeRoute.walkToDestDist * 15).toFixed(0)} min ({activeRoute.walkToDestDist} km)</div>
                            </div>
                          </div>
                          <div className="step-item">
                            <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                            <div className="step-content">{navigationDestination.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (`;

code = code.replace(oldTrainBlockRegex, activeRouteDataHelper);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated UI for 3 tabs and metro rendering logic");
