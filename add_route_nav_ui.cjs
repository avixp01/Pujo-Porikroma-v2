const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state
const stateRegex = /const \[isDirectionPopupOpen, setIsDirectionPopupOpen\] = useState\(false\);/g;
if (regexTest(stateRegex, content)) {
    content = content.replace(stateRegex, `const [isDirectionPopupOpen, setIsDirectionPopupOpen] = useState(false);\n    const [isRouteNavigationOpen, setIsRouteNavigationOpen] = useState(false);`);
    console.log("Added isRouteNavigationOpen state!");
}

// 2. Update Start navigation onClick
const startNavRegex = /onClick=\{\(\) => \{\s*if \(plannedStops\.length > 0\) \{\s*setNavigationDestination\(plannedStops\[0\]\);\s*setActiveDirectionMode\('car'\);\s*setIsDirectionPopupOpen\(true\);\s*\}\s*\}\}/g;

const newStartNavOnClick = `onClick={async () => {
                      if (plannedStops.length === 0) return;
                      if (isTracking && userLocation) {
                        setIsRouteNavigationOpen(true);
                        return;
                      }
                      try {
                        const result = await navigator.permissions.query({ name: 'geolocation' });
                        if (result.state === 'granted') {
                          startTracking();
                          setIsRouteNavigationOpen(true);
                        } else {
                          setShowLocationPopup(true);
                        }
                      } catch (err) {
                        setShowLocationPopup(true);
                      }
                    }}`;

if (regexTest(startNavRegex, content)) {
    content = content.replace(startNavRegex, newStartNavOnClick);
    console.log("Updated Start Navigation onClick!");
}

// 3. Add history back support for isRouteNavigationOpen
const historyRegex = /if \(stateId !== 'direction' && isDirectionPopupOpen\) setIsDirectionPopupOpen\(false\);/g;
const newHistory = `if (stateId !== 'direction' && isDirectionPopupOpen) setIsDirectionPopupOpen(false);
        if (stateId !== 'route-nav' && isRouteNavigationOpen) setIsRouteNavigationOpen(false);`;
if (regexTest(historyRegex, content)) {
    content = content.replace(historyRegex, newHistory);
}

const pushStateRegex = /React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen\) \{\s*window\.history\.pushState\(\{ id: 'direction' \}, ''\);\s*\} else if \(window\.history\.state\?\.id === 'direction'\) \{\s*window\.history\.back\(\);\s*\}\s*\}, \[isDirectionPopupOpen\]\);/g;
const newPushState = `React.useEffect(() => {
      if (isDirectionPopupOpen) {
        window.history.pushState({ id: 'direction' }, '');
      } else if (window.history.state?.id === 'direction') {
        window.history.back();
      }
    }, [isDirectionPopupOpen]);
    React.useEffect(() => {
      if (isRouteNavigationOpen) {
        window.history.pushState({ id: 'route-nav' }, '');
      } else if (window.history.state?.id === 'route-nav') {
        window.history.back();
      }
    }, [isRouteNavigationOpen]);`;
if (regexTest(pushStateRegex, content)) {
    content = content.replace(pushStateRegex, newPushState);
}


// 4. Inject the UI at the end
const endOfFileRegex = /\{\/\* Direction Popup Overlay \*\/\}/g;
const navigationUI = `{/* Route Navigation Full Screen Overlay */}
        {isRouteNavigationOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ backgroundColor: 'white', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10 }}>
              <button onClick={() => setIsRouteNavigationOpen(false)} style={{ background: 'none', border: 'none', marginRight: '16px', cursor: 'pointer' }}>
                <ArrowLeft size={24} />
              </button>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Your route</h2>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>{plannedStops.length} stops planned</div>
              </div>
              <div style={{ display: 'flex', gap: '24px', textAlign: 'center' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                    <MapPin size={18} color="#6b7280" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>Stops</div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22L10 2"></path><path d="M20 22L14 2"></path><path d="M12 22v-4"></path><path d="M12 13v-4"></path></svg>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{(plannedStops.length * 12.3).toFixed(1)} km</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>Distance</div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                    <Clock size={18} color="#6b7280" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>
                    {(() => {
                      const totalMins = plannedStops.length * 23;
                      return totalMins >= 60 ? \`\${Math.floor(totalMins / 60)} hr \${totalMins % 60} min\` : \`\${totalMins}m\`;
                    })()}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>Est. time</div>
                </div>
              </div>
            </div>
            
            {/* Map Container */}
            <div style={{ flex: 1, position: 'relative' }}>
              <MapContainer 
                center={userLocation || [22.5726, 88.3639]} 
                zoom={15} 
                zoomControl={false} 
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer
                  url={isDarkMode 
                    ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                    : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                  }
                />
                {userLocation && (
                  <Marker 
                    position={userLocation}
                    icon={L.divIcon({
                      className: 'custom-nav-user-marker',
                      html: \`<div style="background-color: #3b82f6; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" style="margin-bottom: 2px; margin-right: 1px;"><path d="M3 11l19-9-9 19-2-8-8-2z"></path></svg></div>\`,
                      iconSize: [36, 36],
                      iconAnchor: [18, 18]
                    })}
                  />
                )}
                {plannedRouteCoords.length > 0 && <Polyline positions={plannedRouteCoords} color="#3b82f6" weight={8} opacity={0.9} />}
              </MapContainer>
              
              {/* Map Controls */}
              <div style={{ position: 'absolute', right: '16px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                <div style={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <button style={{ width: '44px', height: '44px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                    <Compass size={20} color="#374151" />
                  </button>
                  <button style={{ width: '44px', height: '44px', border: 'none', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                    <LocateFixed size={20} color="#3b82f6" />
                  </button>
                  <button style={{ width: '44px', height: '44px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                    <Plus size={20} color="#374151" />
                  </button>
                  <button style={{ width: '44px', height: '44px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              </div>
              
              {/* Bottom Panel */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '12px', zIndex: 10 }}>
                <button style={{ backgroundColor: '#27272a', color: 'white', padding: '14px 20px', borderRadius: '12px', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Head out</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#a1a1aa' }}>in 0 m</div>
                </button>
                
                <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>40 min</span>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>34.0 km left</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Stop 1 of {plannedStops.length} • {plannedStops[0]?.name || 'Unknown'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Direction Popup Overlay */}`;

if (regexTest(endOfFileRegex, content)) {
    content = content.replace(endOfFileRegex, navigationUI);
    console.log("Added UI!");
}

function regexTest(reg, c) {
    reg.lastIndex = 0;
    return reg.test(c);
}

fs.writeFileSync(file, content, 'utf8');
