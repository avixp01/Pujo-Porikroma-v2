const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Inject state: const [isLiveNavigating, setIsLiveNavigating] = useState(false);
const stateTarget = /const \[isNavigationActive, setIsNavigationActive\] = useState\(false\);/;
if (stateTarget.test(code)) {
  code = code.replace(stateTarget, `const [isNavigationActive, setIsNavigationActive] = useState(false);\n  const [isLiveNavigating, setIsLiveNavigating] = useState(false);\n  const [pendingLiveNavigation, setPendingLiveNavigation] = useState(false);`);
} else {
  console.log("State target not found!");
}

// 2. Inject effect for pending navigation
const effectTarget = /const startTracking = \(\) => \{/;
const effectInject = `
  React.useEffect(() => {
    if (pendingLiveNavigation && userLocation) {
      setIsLiveNavigating(true);
      setPendingLiveNavigation(false);
    }
  }, [userLocation, pendingLiveNavigation]);

  const startTracking = () => {`;
if (effectTarget.test(code)) {
  code = code.replace(effectTarget, effectInject);
} else {
  console.log("Effect target not found!");
}

// 3. Inject Navigation UI before the main return
const uiInject = `
  if (isLiveNavigating) {
    return (
      <div style={{ width: '100vw', height: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div style={{ padding: '16px', backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 10 }}>
          <button onClick={() => setIsLiveNavigating(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', marginRight: '8px' }}>
            <ArrowLeft size={24} color="#111827" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Your route</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>{plannedStops.length} stops planned</div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><MapPin size={18} color="#6b7280" strokeWidth={2} /></div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>Stops</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><Route size={18} color="#6b7280" strokeWidth={2} /></div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{routeMetrics.totalDist} km</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>Distance</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><Clock size={18} color="#6b7280" strokeWidth={2} /></div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{routeMetrics.totalTime}m</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>Est. time</div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapContainer center={userLocation || (plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lng] : [22.5726, 88.3639])} zoom={15} style={{ width: '100%', height: '100%' }} zoomControl={false}>
            <TileLayer 
              url={isDarkMode 
                ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
              }
            />
            
            {userLocation && (
              <Marker position={userLocation} icon={L.divIcon({
                  className: 'custom-user-nav-icon',
                  html: \`<div style="width:24px;height:24px;background-color:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none" style="margin-left: 1px;"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg></div>\`,
                  iconSize: [24,24],
                  iconAnchor: [12,12]
              })} />
            )}
            
            {plannedStops.map((stop, idx) => (
              <Marker key={\`nav-stop-\${idx}\`} position={[stop.lat, stop.lng]} icon={L.divIcon({
                  className: 'nav-stop-icon',
                  html: \`<div style="background-color: #7c2d12; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); font-size: 12px; font-weight: bold; color: white;">\${idx + 1}</div>\`,
                  iconSize: [24,24],
                  iconAnchor: [12,12]
              })} />
            ))}

            {userLocation && plannedStops.length > 0 && (
              <Polyline 
                positions={[userLocation, ...plannedStops.map(s => [s.lat, s.lng])]} 
                color="#3b82f6" 
                weight={5} 
                opacity={0.8}
                lineCap="round"
                lineJoin="round"
              />
            )}
          </MapContainer>
          
          <div style={{ position: 'absolute', right: '16px', bottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1000 }}>
            <button style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#4b5563', cursor: 'pointer' }}><Compass size={20} /></button>
            <button style={{ width: '40px', height: '40px', backgroundColor: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#3b82f6', cursor: 'pointer' }}><LocateFixed size={20} /></button>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', marginTop: '8px' }}>
                <button style={{ width: '40px', height: '40px', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6', color: '#4b5563', cursor: 'pointer' }}><Plus size={20} /></button>
                <button style={{ width: '40px', height: '40px', backgroundColor: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', cursor: 'pointer' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ backgroundColor: 'white', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 10 }}>
          <div style={{ backgroundColor: '#27272a', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '120px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#3f3f46', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </div>
            <div>
              <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Head out</div>
              <div style={{ color: '#a1a1aa', fontSize: '12px' }}>In 0 m</div>
            </div>
          </div>
          
          <div style={{ flex: 1, paddingLeft: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>{routeMetrics.totalTime} min</span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{routeMetrics.totalDist} km left</span>
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
              Stop 1 of {plannedStops.length} • {plannedStops.length > 0 ? plannedStops[0].name : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
`;

const uiTarget = /return \(\s*<div className=\{`map-page-container/;
if (uiTarget.test(code)) {
  code = code.replace(uiTarget, uiInject + '    <div className={`map-page-container');
} else {
  console.log("UI return target not found!");
}

// 4. Update the "Start navigation" button onClick handler
const btnTarget = /<button style=\{\{ width: '100%', padding: '16px', backgroundColor: '#7c2d12', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba\(0,0,0,0\.1\)' \}\}>/g;
const btnReplace = `<button onClick={() => {
                      if (plannedStops.length === 0) return;
                      if (!userLocation) {
                        setPendingLiveNavigation(true);
                        setShowLocationPopup(true);
                      } else {
                        setIsLiveNavigating(true);
                      }
                    }} style={{ width: '100%', padding: '16px', backgroundColor: '#7c2d12', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>`;

if (btnTarget.test(code)) {
  code = code.replace(btnTarget, btnReplace);
} else {
  console.log("Button target not found!");
}

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log("Success");
