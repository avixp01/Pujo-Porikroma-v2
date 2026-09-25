const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Add TramFront to lucide-react import
code = code.replace(
  /Train, Footprints, Home, Clock, ArrowUpDown, MapPin \} from 'lucide-react';/,
  "Train, TramFront, Footprints, Home, Clock, ArrowUpDown, MapPin } from 'lucide-react';"
);

// Add metroRouteData to state
code = code.replace(
  /const \[transitRouteData, setTransitRouteData\] = useState\(null\);/,
  "const [transitRouteData, setTransitRouteData] = useState(null);\n  const [metroRouteData, setMetroRouteData] = useState(null);"
);

// Update fetchRouteData logic
const oldSimulation = `          // Transit Route Simulation
          let nearestOriginStation = null;
          let minOriginDist = Infinity;
          let nearestDestStation = null;
          let minDestDist = Infinity;
          
          const stations = [...allMetros, ...allTrains];
          
          stations.forEach(station => {
            const distToUser = Math.sqrt(Math.pow(station.lat - userLocation[0], 2) + Math.pow(station.lng - userLocation[1], 2));
            if (distToUser < minOriginDist) {
              minOriginDist = distToUser;
              nearestOriginStation = station;
            }
            
            const distToDest = Math.sqrt(Math.pow(station.lat - navigationDestination.lat, 2) + Math.pow(station.lng - navigationDestination.lng, 2));
            if (distToDest < minDestDist) {
              minDestDist = distToDest;
              nearestDestStation = station;
            }
          });

          setTransitRouteData({
            originStation: nearestOriginStation,
            destStation: nearestDestStation,
            walkToOriginDist: (minOriginDist * 111).toFixed(1),
            walkToDestDist: (minDestDist * 111).toFixed(1),
            trainName: nearestOriginStation?.type === 'metro' ? 'Blue Line Metro' : '31914 - Sealdah Local',
            trainDuration: Math.floor(Math.random() * 30) + 15,
            departureTime: new Date(Date.now() + 5 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          });`;

const newSimulation = `          // Train Route Simulation
          const calculateRoute = (stationList, routeName) => {
            let nearestOrigin = null;
            let minOriginDist = Infinity;
            let nearestDest = null;
            let minDestDist = Infinity;
            
            stationList.forEach(station => {
              const distToUser = Math.sqrt(Math.pow(station.lat - userLocation[0], 2) + Math.pow(station.lng - userLocation[1], 2));
              if (distToUser < minOriginDist) {
                minOriginDist = distToUser;
                nearestOrigin = station;
              }
              
              const distToDest = Math.sqrt(Math.pow(station.lat - navigationDestination.lat, 2) + Math.pow(station.lng - navigationDestination.lng, 2));
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

code = code.replace(oldSimulation, newSimulation);

// Add Metro Polyline
const oldMapLines = `{isDirectionPopupOpen && navigationDestination && transitRouteData && activeDirectionMode === 'train' && transitRouteData.originStation && transitRouteData.destStation && (
            <>
              <Polyline positions={[userLocation, [transitRouteData.originStation.lat, transitRouteData.originStation.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
              <Polyline positions={[[transitRouteData.originStation.lat, transitRouteData.originStation.lng], [transitRouteData.destStation.lat, transitRouteData.destStation.lng]]} color="#16a085" weight={5} />
              <Polyline positions={[[transitRouteData.destStation.lat, transitRouteData.destStation.lng], [navigationDestination.lat, navigationDestination.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
            </>
          )}`;

const newMapLines = `{isDirectionPopupOpen && navigationDestination && transitRouteData && activeDirectionMode === 'train' && transitRouteData.originStation && transitRouteData.destStation && (
            <>
              <Polyline positions={[userLocation, [transitRouteData.originStation.lat, transitRouteData.originStation.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
              <Polyline positions={[[transitRouteData.originStation.lat, transitRouteData.originStation.lng], [transitRouteData.destStation.lat, transitRouteData.destStation.lng]]} color="#16a085" weight={5} />
              <Polyline positions={[[transitRouteData.destStation.lat, transitRouteData.destStation.lng], [navigationDestination.lat, navigationDestination.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
            </>
          )}
          {isDirectionPopupOpen && navigationDestination && metroRouteData && activeDirectionMode === 'metro' && metroRouteData.originStation && metroRouteData.destStation && (
            <>
              <Polyline positions={[userLocation, [metroRouteData.originStation.lat, metroRouteData.originStation.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
              <Polyline positions={[[metroRouteData.originStation.lat, metroRouteData.originStation.lng], [metroRouteData.destStation.lat, metroRouteData.destStation.lng]]} color="#8b5cf6" weight={5} />
              <Polyline positions={[[metroRouteData.destStation.lat, metroRouteData.destStation.lng], [navigationDestination.lat, navigationDestination.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
            </>
          )}`;

code = code.replace(oldMapLines, newMapLines);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated MapPage state, routing calculation, and map polylines for Metro");
