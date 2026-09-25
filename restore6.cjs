const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Replace the MarkerClusterGroup block
const start1 = code.indexOf("<MarkerClusterGroup chunkedLoading>");
const end1 = code.indexOf("</MarkerClusterGroup>") + "</MarkerClusterGroup>".length;

const newCluster = `{(() => {
            const createClusterIcon = (cluster) => {
              const childCount = cluster.getChildCount();
              let c = ' marker-cluster-';
              if (childCount < 10) { c += 'small'; }
              else if (childCount < 100) { c += 'medium'; }
              else { c += 'large'; }
              
              let bgColor = '#c8963e';
              if (activeFilter === 'toilet') bgColor = '#2980b9';
              if (activeFilter === 'metro') bgColor = '#16a085';
              if (activeFilter === 'train') bgColor = '#8e44ad';

              return new L.DivIcon({ 
                html: \`<div style="background-color: \${bgColor} !important; color: white; opacity: 0.9;"><span>\${childCount}</span></div>\`, 
                className: 'marker-cluster' + c, 
                iconSize: new L.Point(40, 40) 
              });
            };

            const pandalIconBright = new L.Icon({
              iconUrl: '/pandal-pin4.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const pandalIconDark = new L.Icon({
              iconUrl: '/pandel-pin6.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const toiletIconBright = new L.Icon({
              iconUrl: '/toilet-day.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const toiletIconDark = new L.Icon({
              iconUrl: '/toilet-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const metroIconBright = new L.Icon({
              iconUrl: '/metro-day.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const metroIconDark = new L.Icon({
              iconUrl: '/metro-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const trainIconBright = new L.Icon({
              iconUrl: '/train-day.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const trainIconDark = new L.Icon({
              iconUrl: '/train-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            
            return (
              <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} disableClusteringAtZoom={17} maxClusterRadius={40}>
                {filteredData.map(loc => {
                  let markerIcon;
                  if (loc.type === 'pandal') {
                    markerIcon = isDarkMode ? pandalIconDark : pandalIconBright;
                  } else if (loc.type === 'toilet') {
                    markerIcon = isDarkMode ? toiletIconDark : toiletIconBright;
                  } else if (loc.type === 'metro') {
                    markerIcon = isDarkMode ? metroIconDark : metroIconBright;
                  } else if (loc.type === 'train') {
                    markerIcon = isDarkMode ? trainIconDark : trainIconBright;
                  } else {
                    markerIcon = createCustomIcon(loc.type, loc.count);
                  }
                  
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

if (start1 !== -1 && end1 > start1) {
    code = code.substring(0, start1) + newCluster + code.substring(end1);
}

// 2. Replace the train button SVG
const trainBtnMatch = code.match(/<button[\s\S]{10,150}onClick=\{\(\) => setActiveFilter\(activeFilter === 'train' \? 'all' : 'train'\)\}[\s\S]{10,250}TRAIN[\s\S]{5,30}<\/button>/);
if (trainBtnMatch) {
  const newTrainBtn = `<button 
              onClick={() => setActiveFilter(activeFilter === 'train' ? 'all' : 'train')}
              className={\`map-filter-pill \${activeFilter === 'train' ? 'active-train' : ''}\`}
            >
              <img src="/train-icon.png" width="12" height="12" alt="train" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
              TRAIN
            </button>`;
  code = code.replace(trainBtnMatch[0], newTrainBtn);
}

// 3. Replace the getItemTheme SVG
const trainThemeMatch = code.match(/case 'train':[\s\S]{10,250}bg: '#f3e8ff',[\s\S]{10,250}icon: <svg[\s\S]{10,400}<\/svg>[\s\S]{5,30}\};/);
if (trainThemeMatch) {
  const newTrainTheme = `case 'train': 
          return { 
            color: '#9333ea', 
            bg: '#f3e8ff', 
            icon: <img src="/train-icon.png" width="20" height="20" alt="train" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };`;
  code = code.replace(trainThemeMatch[0], newTrainTheme);
}

fs.writeFileSync("src/components/MapPage.jsx", code, "utf8");
console.log("Restored all carefully!");
