const fs = require('fs');
let lines = fs.readFileSync('src/components/MapPage.jsx', 'utf8').split('\n');

const oldCalc = `          // Train Route Simulation
          const calculateRoute = (stationList, routeName) => {
            let nearestOrigin = null;
            let minOriginDist = Infinity;
            let nearestDest = null;
            let minDestDist = Infinity;
            
            stationList.forEach(station => {
              const distToUser = Math.sqrt(Math.pow(station.lat - startLat, 2) + Math.pow(station.lng - startLng, 2));
              if (distToUser < minOriginDist) {
                minOriginDist = distToUser;
                nearestOrigin = station;
              }
              
              const distToDest = Math.sqrt(Math.pow(station.lat - endLat, 2) + Math.pow(station.lng - endLng, 2));
              if (distToDest < minDestDist) {
                minDestDist = distToDest;
                nearestDest = station;
              }
            });

            return {
              originStation: nearestOrigin,
              destStation: nearestDest,
              walkToOriginDist: (minOriginDist * 111).toFixed(1),
              walkToDestDist: (minDestDist * 111).toFixed(1),
              trainName: routeName,
              trainDuration: Math.floor(Math.random() * 30) + 15,
              departureTime: new Date(Date.now() + 5 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
          };

          setTransitRouteData(calculateRoute(allTrains, '31914 - Sealdah Local'));
          setMetroRouteData(calculateRoute(allMetros, 'Blue Line Metro'));`;

let calcStart = -1;
let calcEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Helper to fetch OSRM foot route')) calcStart = i;
  if (calcStart !== -1 && i > calcStart && lines[i].includes('setMetroRouteData(metroResult);')) {
    calcEnd = i;
    break;
  }
}

if (calcStart !== -1 && calcEnd !== -1) {
  lines.splice(calcStart, calcEnd - calcStart + 1, oldCalc);
  fs.writeFileSync('src/components/MapPage.jsx', lines.join('\n'), 'utf8');
  console.log('Successfully reverted calculateRoute.');
} else {
  console.log('Could not find calculateRouteAsync block.');
}
