const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex1 = /\/\/ Train Route Simulation[\s\S]*?setMetroRouteData\(calculateRoute\(allMetros, 'Blue Line Metro'\)\);/g;

const replacement1 = `// Helper to fetch OSRM foot route
          const fetchFootRoute = async (sLat, sLng, dLat, dLng) => {
            const url = \`https://router.project-osrm.org/route/v1/foot/\${sLng},\${sLat};\${dLng},\${dLat}?steps=true&geometries=geojson&overview=full\`;
            try {
              const res = await fetch(url);
              const data = await res.json();
              if (data.routes && data.routes.length > 0) return data.routes[0];
            } catch (e) {}
            return null;
          };

          const calculateRouteAsync = async (stationList, routeName) => {
            let nearestOrigin = null;
            let minOriginDist = Infinity;
            let nearestDest = null;
            let minDestDist = Infinity;
            
            const getDist = (lat1, lon1, lat2, lon2) => {
              const R = 6371;
              const dLat = (lat2-lat1)*Math.PI/180;
              const dLon = (lon2-lon1)*Math.PI/180;
              const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
              return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            };

            const directDist = getDist(startLat, startLng, endLat, endLng);
            
            stationList.forEach(station => {
              const distToUser = getDist(station.lat, station.lng, startLat, startLng);
              if (distToUser < minOriginDist) { minOriginDist = distToUser; nearestOrigin = station; }
              const distToDest = getDist(station.lat, station.lng, endLat, endLng);
              if (distToDest < minDestDist) { minDestDist = distToDest; nearestDest = station; }
            });

            if (!nearestOrigin || !nearestDest || nearestOrigin.id === nearestDest.id || directDist < 1.5) {
               return { isPureWalk: true };
            }

            const routeToOrigin = await fetchFootRoute(startLat, startLng, nearestOrigin.lat, nearestOrigin.lng);
            const routeToDest = await fetchFootRoute(nearestDest.lat, nearestDest.lng, endLat, endLng);

            const walkToOriginMeters = routeToOrigin ? routeToOrigin.distance : minOriginDist * 1000;
            const walkToDestMeters = routeToDest ? routeToDest.distance : minDestDist * 1000;
            const walkToOriginSteps = routeToOrigin ? routeToOrigin.legs[0].steps : [];
            const walkToDestSteps = routeToDest ? routeToDest.legs[0].steps : [];
            const walkToOriginCoords = routeToOrigin ? routeToOrigin.geometry.coordinates.map(c => [c[1], c[0]]) : [[startLat, startLng], [nearestOrigin.lat, nearestOrigin.lng]];
            const walkToDestCoords = routeToDest ? routeToDest.geometry.coordinates.map(c => [c[1], c[0]]) : [[nearestDest.lat, nearestDest.lng], [endLat, endLng]];

            return {
              isPureWalk: false,
              originStation: nearestOrigin,
              destStation: nearestDest,
              walkToOriginMeters,
              walkToDestMeters,
              walkToOriginSteps,
              walkToDestSteps,
              walkToOriginCoords,
              walkToDestCoords,
              trainName: routeName,
              trainDuration: Math.max(2, Math.ceil(getDist(nearestOrigin.lat, nearestOrigin.lng, nearestDest.lat, nearestDest.lng) * 1.5)),
              departureTime: new Date(Date.now() + 5*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
          };

          const transitResult = await calculateRouteAsync(allTrains, '31914 - Sealdah Local');
          setTransitRouteData(transitResult);
          
          const metroResult = await calculateRouteAsync(allMetros, 'Blue Line Metro');
          setMetroRouteData(metroResult);`;

code = code.replace(regex1, replacement1);
fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
