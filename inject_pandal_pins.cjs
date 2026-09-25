const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const replacementRender = `          {(() => {
            const pandalIconBright = new L.Icon({
              iconUrl: '/pandal-pin.png',
              iconSize: [40, 50],
              iconAnchor: [20, 50],
              popupAnchor: [0, -50]
            });
            const pandalIconDark = new L.Icon({
              iconUrl: '/pandel-pin2.png',
              iconSize: [40, 50],
              iconAnchor: [20, 50],
              popupAnchor: [0, -50]
            });
            
            return (
              <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} disableClusteringAtZoom={17} maxClusterRadius={40}>
                {filteredData.map(loc => {
                  const isPandal = loc.type === 'pandal';
                  const markerIcon = isPandal ? (isDarkMode ? pandalIconDark : pandalIconBright) : undefined;
                  
                  return (
                    <Marker 
                      key={loc.id} 
                      position={[loc.lat, loc.lng]} 
                      eventHandlers={{
                        click: () => handleMarkerClick(loc)
                      }}
                      {...(markerIcon ? { icon: markerIcon } : {})}
                    />
                  );
                })}
              </MarkerClusterGroup>
            );
          })()}`;

const blockToReplaceRegex = /<MarkerClusterGroup[\s\S]*?<\/MarkerClusterGroup>/;

code = code.replace(blockToReplaceRegex, replacementRender);
fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Injected custom pandal markers!');
