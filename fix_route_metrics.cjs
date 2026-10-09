const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const metricsInjection = `
  const routeMetrics = React.useMemo(() => {
    let totalDist = 0;
    let stopsMetrics = [];
    let currentPoint = userLocation || (plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lng] : null);

    plannedStops.forEach((stop) => {
      let dist = 0;
      if (currentPoint) {
         dist = getDistance(currentPoint[0], currentPoint[1], stop.lat, stop.lng);
      }
      totalDist += dist;
      stopsMetrics.push({
         cumulativeDist: totalDist,
         cumulativeTime: Math.round(totalDist * 12)
      });
      currentPoint = [stop.lat, stop.lng];
    });
    
    return {
      totalDist: totalDist.toFixed(1),
      totalTime: Math.round(totalDist * 12),
      stops: stopsMetrics
    };
  }, [plannedStops, userLocation]);

  return (
`;

code = code.replace(/return \(\s*<div className=\{`map-page-container/, metricsInjection + '    <div className={`map-page-container');

// Replace header distance
const headerDistTarget = /\{\(plannedStops\.length \* 12\.3\)\.toFixed\(1\)\} km/g;
code = code.replace(headerDistTarget, `{routeMetrics.totalDist} km`);

// Replace header ETA
const headerTimeTarget = /\{plannedStops\.length \* 23\}m/g;
code = code.replace(headerTimeTarget, `{routeMetrics.totalTime}m`);

// Replace individual stop ETA
// The string in code is roughly: ETA {idx * 15 + 10}m • {(idx * 2.4 + 1.2).toFixed(1)} km
const stopETATarget = /ETA \{idx \* 15 \+ 10\}m\s*.\s*\{\(idx \* 2\.4 \+ 1\.2\)\.toFixed\(1\)\}\s*km/g;
code = code.replace(stopETATarget, `ETA {routeMetrics.stops[idx]?.cumulativeTime || 0}m • {routeMetrics.stops[idx]?.cumulativeDist.toFixed(1) || 0} km`);

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('Metrics logic injected and replaced successfully.');
