const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Replace the popup button
const routeBtnRegex = /<button className=\{\`btn-route \$\{plannedStops\.find\(s => s\.id === selectedLocation\?\.id\) \? 'added' : ''\}\`\} onClick=\{.*?\}\s*>\s*\{selectedLocation && selectedLocation\.type === 'train' \? \(\s*<><Clock size=\{18\} \/> Timetable<\/>\s*\) : \(\s*<><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"><\/line><line x1="5" y1="12" x2="19" y2="12"><\/line><\/svg> Route<\/>\s*\)\s*\}\s*<\/button>/s;

const newRouteBtn = `<button className={\`btn-route \${plannedStops.find(s => s.id === selectedLocation?.id) ? 'added' : ''}\`} onClick={() => {
                    if (selectedLocation && selectedLocation.type !== 'train') {
                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        setPlannedStops([...plannedStops, selectedLocation]);
                      } else {
                        setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                      }
                    }
                  }}>
                    {selectedLocation && selectedLocation.type === 'train' ? (
                      <><Clock size={18} /> Timetable</>
                    ) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                      <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                    ) : (
                      <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                    )}
                  </button>`;

code = code.replace(routeBtnRegex, newRouteBtn);

// 2. Add badge to Routes tab
const routesTabRegex = /<button\s*className="flex flex-col items-center justify-center w-full h-full"\s*style=\{\{\s*color: activeTab === 'routes' \? '#dc2626' : '#9ca3af'\s*\}\}\s*onClick=\{\(\) => setActiveTab\('routes'\)\}\s*>\s*<svg width="24" height="24" viewBox="0 0 24 24" style=\{\{\s*marginBottom: '4px'\s*\}\}>/s;

const newRoutesTab = `<button 
              className="flex flex-col items-center justify-center w-full h-full relative" 
              style={{ color: activeTab === 'routes' ? '#7c2d12' : '#9ca3af' }}
              onClick={() => setActiveTab('routes')}
            >
              {plannedStops.length > 0 && (
                <div style={{ position: 'absolute', top: '4px', right: '25%', backgroundColor: '#7c2d12', color: 'white', fontSize: '9px', fontWeight: 'bold', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {plannedStops.length}
                </div>
              )}
              <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '4px' }}>`;

code = code.replace(routesTabRegex, newRoutesTab);

// 3. Replace routes-content
const routesContentRegex = /<div className="routes-content">\s*<div className="routes-empty-card">\s*<div className="routes-empty-icon">\s*<svg viewBox="0 0 24 24" width="32" height="32" stroke="#cc5550" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">\s*<path d="M3 11l19-9-9 19-2-8-8-2z" \/>\s*<\/svg>\s*<\/div>\s*<h3 className="routes-empty-title">No stops yet<\/h3>\s*<p className="routes-empty-desc">\s*Tap any pandal, metro or toilet on the map and add it to plan your route\.\s*<\/p>\s*<button className="routes-browse-btn" onClick=\{\(\) => setActiveTab\('map'\)\}>\s*Browse the map\s*<\/button>\s*<\/div>\s*<\/div>/s;

const newRoutesContent = `<div className="routes-content" style={{ paddingBottom: '100px', backgroundColor: '#fafafa', minHeight: '100%' }}>
            {plannedStops.length === 0 ? (
              <div className="routes-empty-card">
                <div className="routes-empty-icon" style={{ borderColor: '#fef3c7' }}>
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l19-9-9 19-2-8-8-2z" />
                  </svg>
                </div>
                <h3 className="routes-empty-title">No stops yet</h3>
                <p className="routes-empty-desc">
                  Tap any pandal, metro or toilet on the map and add it to plan your route.
                </p>
                <button className="routes-browse-btn" onClick={() => setActiveTab('map')} style={{ backgroundColor: '#7c2d12', color: 'white' }}>
                  Browse the map
                </button>
              </div>
            ) : (
              <div className="routes-active-itinerary">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 16px 8px 16px', backgroundColor: 'white' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Your route</h2>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Tonight • {plannedStops.length} stops planned</p>
                  </div>
                  <button style={{ color: '#4b5563' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                  </button>
                </div>

                {/* Metrics */}
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 0', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Stops</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{(plannedStops.length * 12.3).toFixed(1)} km</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Distance</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length * 23}m</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Est. time</div>
                  </div>
                </div>

                {/* Minimap Placeholder */}
                <div style={{ height: '180px', backgroundColor: '#e5e7eb', width: '100%', position: 'relative' }}>
                  <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://unpkg.com/leaflet@1.9.4/dist/images/layers.png)', backgroundSize: 'cover', opacity: 0.5 }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#7c2d12', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    <img src="/pandel-icon.png" alt="pandal" style={{ width: "16px", height: "16px", filter: "invert(1)" }} />
                  </div>
                </div>

                <div style={{ padding: '20px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Route timeline ({plannedStops.length}) <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 'normal', marginLeft: '4px' }}>{plannedStops.length}/10</span></h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }} onClick={() => setPlannedStops([])}>Clear all</button>
                      <button style={{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>Edit stops <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    </div>
                  </div>

                  <div className="route-timeline-list" style={{ position: 'relative' }}>
                    {plannedStops.map((stop, idx) => (
                      <div key={idx} style={{ display: 'flex', marginBottom: '0', position: 'relative', paddingBottom: '24px' }}>
                        {idx < plannedStops.length - 1 && <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '0', width: '2px', backgroundColor: '#fcd34d', zIndex: 0 }}></div>}
                        
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#111827', zIndex: 1, flexShrink: 0, marginRight: '16px' }}>
                          {idx + 1}
                        </div>
                        
                        <div style={{ flex: 1, paddingBottom: '24px', borderBottom: idx < plannedStops.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '2px' }}>{stop.name}</div>
                              <div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'capitalize' }}>{stop.type}</div>
                              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>ETA {idx * 15 + 10}m • {(idx * 2.4 + 1.2).toFixed(1)} km</div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', color: '#9ca3af' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('map')}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c2d12', marginRight: '16px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </div>
                      <div>
                        <div style={{ color: '#7c2d12', fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Next stop</div>
                        <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'left' }}>Search pandals or add from map</div>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>

                {/* FAB Overlay */}
                <div style={{ position: 'fixed', bottom: '80px', left: '0', right: '0', padding: '0 16px', zIndex: 100 }}>
                  <button className="start-nav-fab" style={{ width: '100%', backgroundColor: '#7c2d12', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 8px 24px rgba(124, 45, 18, 0.4)', gap: '8px' }} onClick={() => {
                    if (plannedStops.length > 0) {
                      setNavigationDestination(plannedStops[0]);
                      setActiveDirectionMode('car');
                      setIsDirectionPopupOpen(true);
                    }
                  }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                    </svg>
                    Start navigation
                  </button>
                </div>
              </div>
            )}
          </div>`;

code = code.replace(routesContentRegex, newRoutesContent);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Replaced route JSX components successfully.");
