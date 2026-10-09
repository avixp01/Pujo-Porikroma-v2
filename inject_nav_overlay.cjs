const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state variables
const stateTarget = `const [isDirectionPopupOpen, setIsDirectionPopupOpen] = useState(false);`;
if (content.includes(stateTarget)) {
    content = content.replace(stateTarget, `${stateTarget}
    const [isRouteNavigationOpen, setIsRouteNavigationOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    React.useEffect(() => {
      if (userLocation && pendingAction === 'route_navigation') {
        setIsRouteNavigationOpen(true);
        setPendingAction(null);
      }
    }, [userLocation, pendingAction]);`);
}

// 2. Add RouteNavigationOverlay component BEFORE MapPage
const componentCode = `
const RouteNavigationOverlay = ({ plannedStops, userLocation, onClose, isDarkMode }) => {
  const [routeCoords, setRouteCoords] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    if (plannedStops && plannedStops.length > 0) {
      const validStops = plannedStops.filter(s => s && typeof s.lat === 'number' && typeof s.lng === 'number');
      if (validStops.length > 0) {
        const fetchMultiRoute = async () => {
           try {
             let coordsStr = '';
             if (userLocation && Array.isArray(userLocation) && userLocation.length >= 2) {
                coordsStr += \`\${userLocation[1]},\${userLocation[0]};\`;
             }
             coordsStr += validStops.map(s => \`\${s.lng},\${s.lat}\`).join(';');
             const res = await fetch(\`https://router.project-osrm.org/route/v1/foot/\${coordsStr}?overview=full&geometries=geojson\`);
             const data = await res.json();
             if (isMounted && data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
               const rawCoords = data.routes[0].geometry.coordinates;
               if (Array.isArray(rawCoords)) {
                   const parsed = rawCoords.map(c => {
                       if (Array.isArray(c) && c.length >= 2 && typeof c[0] === 'number' && typeof c[1] === 'number') {
                           return [c[1], c[0]];
                       }
                       return null;
                   }).filter(c => c !== null);
                   if (parsed.length > 0) setRouteCoords(parsed);
               }
             }
           } catch(e) {
             console.error("OSRM Multi-stop routing error:", e);
           }
        };
        fetchMultiRoute();
      }
    }
    return () => { isMounted = false; };
  }, [plannedStops, userLocation]);

  const NavMapController = () => {
    const map = useMap();
    React.useEffect(() => {
      const timer = setTimeout(() => { map.invalidateSize(); }, 100);
      return () => clearTimeout(timer);
    }, [map]);
    
    React.useEffect(() => {
      if (routeCoords && routeCoords.length > 0) {
        const bounds = L.latLngBounds(routeCoords);
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 17 });
        }
      } else if (userLocation) {
        map.setView(userLocation, 16);
      }
    }, [routeCoords, userLocation, map]);
    return null;
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#f3f4f6', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
          <button onClick={onClose} style={{ border: 'none', background: 'none', padding: 0, marginRight: '16px', cursor: 'pointer' }}>
            <ArrowLeft size={28} color="#111827" strokeWidth={2.5} />
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>Your route</h2>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px', fontWeight: '500' }}>{plannedStops.length} stops planned</div>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><MapPin size={18} color="#6b7280" /></div>
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
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={userLocation || [22.5726, 88.3639]} zoom={15} zoomControl={false} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url={isDarkMode ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\` : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`}
            attribution='&copy; CARTO'
          />
          <NavMapController />
          
          {routeCoords && <Polyline positions={routeCoords} color="#2563eb" weight={6} opacity={0.9} />}
          
          {userLocation && (
            <Marker position={userLocation} icon={L.divIcon({
              className: 'custom-nav-user-marker',
              html: \`<div style="background-color: white; border-radius: 50%; padding: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><div style="background-color: #2563eb; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="10" height="10" fill="white" style="transform: rotate(-45deg)"><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/></svg></div></div>\`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })} />
          )}
          
          {plannedStops.filter(s => s && typeof s.lat === 'number' && typeof s.lng === 'number').map((stop, idx) => (
            <Marker key={idx} position={[stop.lat, stop.lng]} icon={L.divIcon({
              className: 'custom-route-marker',
              html: \`<div style="background-color: white; width: 24px; height: 24px; border-radius: 50%; color: #111827; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid \${idx === 0 ? '#10b981' : idx === plannedStops.length - 1 ? '#ef4444' : '#f59e0b'}; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">\${idx + 1}</div>\`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })} />
          ))}
        </MapContainer>
        
        {/* Floating Controls */}
        <div style={{ position: 'absolute', right: '16px', bottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 400 }}>
          <button style={{ width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Compass size={24} color="#374151" />
          </button>
          <button style={{ width: '48px', height: '48px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <LocateFixed size={24} color="#2563eb" />
          </button>
          <div style={{ backgroundColor: 'white', borderRadius: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <button style={{ width: '48px', height: '48px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderBottom: '1px solid #f3f4f6' }}>
              <Plus size={24} color="#374151" />
            </button>
            <button style={{ width: '48px', height: '48px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
              <span style={{ fontSize: '24px', fontWeight: '500', color: '#374151', lineHeight: 1 }}>−</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '0 -4px 16px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ backgroundColor: '#1f2937', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', color: 'white', width: '180px' }}>
          <div style={{ backgroundColor: '#374151', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Head out</div>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '2px' }}>In 0 m</div>
          </div>
        </div>
        <div style={{ padding: '0 24px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length * 23} min</div>
            <div style={{ fontSize: '15px', color: '#6b7280', fontWeight: '500' }}>{(plannedStops.length * 12.3).toFixed(1)} km left</div>
          </div>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Stop 1 of {plannedStops.length} · {plannedStops[0]?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
`;

if (!content.includes('const RouteNavigationOverlay')) {
    content = content.replace('const MapPage = ({ onClose }) => {', componentCode + '\nconst MapPage = ({ onClose }) => {');
}

// 3. Inject it inside MapPage return
const renderTarget = `{/* Location Request Popup */}`;
if (content.includes(renderTarget)) {
    content = content.replace(renderTarget, `{isRouteNavigationOpen && (
        <RouteNavigationOverlay 
          plannedStops={plannedStops} 
          userLocation={userLocation} 
          isDarkMode={isDarkMode}
          onClose={() => setIsRouteNavigationOpen(false)} 
        />
      )}\n\n      {/* Location Request Popup */}`);
}

// 4. Update the "Start navigation" button onClick handler
// Locate the exact Start navigation onClick code block.
// It looks like:
/*
onClick={() => {
  if (plannedStops.length > 0) {
    setNavigationDestination(plannedStops[0]);
    setActiveDirectionMode('car');
    setIsDirectionPopupOpen(true);
  }
}}>
*/
const navBtnRegex = /onClick=\{\(\) => \{\s*if \(plannedStops\.length > 0\) \{\s*setNavigationDestination\(plannedStops\[0\]\);\s*setActiveDirectionMode\('car'\);\s*setIsDirectionPopupOpen\(true\);\s*\}\s*\}\}/;

if (navBtnRegex.test(content)) {
    content = content.replace(navBtnRegex, `onClick={() => {
                      if (plannedStops.length > 0) {
                        if (!userLocation) {
                          setPendingAction('route_navigation');
                          setShowLocationPopup(true);
                        } else {
                          setIsRouteNavigationOpen(true);
                        }
                      }
                    }}`);
} else {
    console.log("Could not find Start navigation button onClick with regex!");
}

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully injected RouteNavigationOverlay!");
