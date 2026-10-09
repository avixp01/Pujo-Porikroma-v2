const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add import statement
const importRegex = /import 'leaflet-rotate';/;
if (!code.includes('import trainTimetable from')) {
    code = code.replace(importRegex, `import 'leaflet-rotate';\nimport trainTimetable from '../data/trainTimetable.json';`);
}

// 2. Define the new component BEFORE the MapPage component
const componentCode = `
const TimetableDisplay = ({ stationName, isDarkMode }) => {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000); // refresh every 10s
    return () => clearInterval(timer);
  }, []);

  const getNextTrains = (trains) => {
    if (!trains) return [];
    const nowMs = now.getTime();
    const limitMs = nowMs + 30 * 60 * 1000;
    
    const nextTrains = [];
    for (const t of trains) {
      const [h, m] = t.time.split(':').map(Number);
      let d = new Date(now);
      d.setHours(h, m, 0, 0);
      
      // Handle overnight
      if (d.getTime() < nowMs && (now.getHours() > 22 && h < 2)) {
        d.setDate(d.getDate() + 1);
      }
      
      if (d.getTime() >= nowMs && d.getTime() <= limitMs) {
        nextTrains.push({ ...t, diffMs: d.getTime() - nowMs, arriveIn: Math.floor((d.getTime() - nowMs) / 60000) });
      }
    }
    
    // As per user request: "do not truncate to 2 or 3 trains if 5 valid schedule entries exist in that timeframe"
    // So if there are valid trains in the 30min window, slice to 5.
    return nextTrains.sort((a, b) => a.diffMs - b.diffMs).slice(0, 5);
  };

  const cleanName = stationName ? stationName.replace(/ Railway Station/i, '').trim() : '';
  const stationData = trainTimetable[cleanName] || { up: [], down: [] };
  
  const upTrains = getNextTrains(stationData.up);
  const downTrains = getNextTrains(stationData.down);

  const renderTrainList = (trains) => {
    if (trains.length === 0) {
      return <p style={{ color: isDarkMode ? '#aaa' : '#666', fontSize: '13px' }}>No trains in next 30 mins.</p>;
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {trains.map((t, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9', padding: '6px 10px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold', color: isDarkMode ? '#eee' : '#333' }}>{t.trainNumber} - {t.trainName}</span>
              <span style={{ color: '#7c2d12', fontSize: '11px' }}>Arrival: {t.time}</span>
            </div>
            <div style={{ fontWeight: 'bold', color: '#16a085', minWidth: '45px', textAlign: 'right' }}>
              {t.arriveIn === 0 ? 'Now' : \`\${t.arriveIn} m\`}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', boxSizing: 'border-box', padding: '15px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: '8px' }}>
        <h4 style={{ color: '#7c2d12', marginBottom: '10px', fontWeight: 'bold' }}>Up Train</h4>
        {renderTrainList(upTrains)}
      </div>
      <div style={{ width: '100%', boxSizing: 'border-box', padding: '15px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: '8px' }}>
        <h4 style={{ color: '#7c2d12', marginBottom: '10px', fontWeight: 'bold' }}>Down Train</h4>
        {renderTrainList(downTrains)}
      </div>
    </div>
  );
};
`;

if (!code.includes('const TimetableDisplay =')) {
    code = code.replace(/const MapPage = \(\{ onClose \}\) => \{/, componentCode + '\nconst MapPage = ({ onClose }) => {');
}

// 3. Replace the placeholder UI with the component
const uiRegex = /<div style=\{\{ padding: '20px', textAlign: 'center', color: isDarkMode \? '#aaa' : '#666', border: '1px dashed #ccc', borderRadius: '8px' \}\}>\s*<p>Timetable data will be displayed here soon\.<\/p>\s*<\/div>/;

if (uiRegex.test(code)) {
    code = code.replace(uiRegex, `<TimetableDisplay stationName={selectedLocation ? selectedLocation.name : ''} isDarkMode={isDarkMode} />`);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log('Successfully injected TimetableDisplay component fixed!');
} else {
    console.log('Could not find the timetable placeholder UI to replace!');
}
