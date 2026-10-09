const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></div>
                      <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{(plannedStops.length * 12.3).toFixed(1)} km</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>Distance</div>`;

const replaceStr = `<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><Route size={18} color="#6b7280" strokeWidth={2} /></div>
                      <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{(plannedStops.length * 12.3).toFixed(1)} km</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>Distance</div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found!');
  
  // try regex just in case
  const regexTarget = /<div style=\{\{ display: 'flex', justifyContent: 'center', marginBottom: '4px' \}\}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s-8-4\.5-8-11\.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8\.2c0 7\.3-8 11\.8-8 11\.8z"\/><circle cx="12" cy="10" r="3"\/><\/svg><\/div>\s*<div style=\{\{ fontSize: '15px', fontWeight: 'bold', color: '#111827' \}\}>\{\(plannedStops\.length \* 12\.3\)\.toFixed\(1\)\} km<\/div>\s*<div style=\{\{ fontSize: '11px', color: '#9ca3af' \}\}>Distance<\/div>/;
  const regexReplace = `<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><Route size={18} color="#6b7280" strokeWidth={2} /></div>
                      <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{(plannedStops.length * 12.3).toFixed(1)} km</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>Distance</div>`;

  if (regexTarget.test(code)) {
    code = code.replace(regexTarget, regexReplace);
    fs.writeFileSync('src/components/MapPage.jsx', code);
    console.log('Replaced successfully via regex.');
  } else {
     console.log('Regex target string not found either!');
  }
}
