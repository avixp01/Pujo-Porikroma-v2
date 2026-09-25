const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const clusterFn = `
  const createClusterIcon = (cluster) => {
    const count = cluster.getChildCount();
    let bgColor = '#e67e22'; // fallback orange
    let shadowColor = 'rgba(230, 126, 34, 0.4)';
    
    if (activeFilter === 'pandal' || activeFilter === 'all') {
      bgColor = '#c8963e'; // pandal orange
      shadowColor = 'rgba(200, 150, 62, 0.4)';
    } else if (activeFilter === 'metro') {
      bgColor = '#2980b9';
      shadowColor = 'rgba(41, 128, 185, 0.4)';
    } else if (activeFilter === 'toilet') {
      bgColor = '#16a085';
      shadowColor = 'rgba(22, 160, 133, 0.4)';
    } else if (activeFilter === 'train') {
      bgColor = '#8e44ad';
      shadowColor = 'rgba(142, 68, 173, 0.4)';
    }

    return L.divIcon({
      html: \`<div style="background-color: \${shadowColor}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
               <div style="background-color: \${bgColor}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 0 4px rgba(0,0,0,0.3);">
                 \${count}
               </div>
             </div>\`,
      className: 'custom-cluster-icon',
      iconSize: L.point(40, 40, true),
    });
  };
`;

const target = "const filteredData = locationData.filter(loc => activeFilter === 'all' || loc.type === activeFilter);";
if(code.indexOf(target) !== -1) {
  code = code.replace(target, target + '\n' + clusterFn);
}

const targetCluster = "<MarkerClusterGroup chunkedLoading>";
const replaceCluster = "<MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} disableClusteringAtZoom={17} maxClusterRadius={40}>";
if(code.indexOf(targetCluster) !== -1) {
  code = code.replace(targetCluster, replaceCluster);
}

const targetCluster2 = "<MarkerClusterGroup \n            chunkedLoading \n            key={isDarkMode ? 'cluster-dark' : 'cluster-light'}\n            disableClusteringAtZoom={17}\n            maxClusterRadius={40}\n          >";
const replaceCluster2 = "<MarkerClusterGroup \n            chunkedLoading \n            key={isDarkMode ? 'cluster-dark' : 'cluster-light'}\n            iconCreateFunction={createClusterIcon}\n            disableClusteringAtZoom={17}\n            maxClusterRadius={40}\n          >";
if(code.indexOf(targetCluster2) !== -1) {
  code = code.replace(targetCluster2, replaceCluster2);
}

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Added custom cluster function properly!');
