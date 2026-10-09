const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `<div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'capitalize' }}>{stop.type}</div>`;
const replaceStr = `<div style={{ fontSize: '14px', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>{stop.type === 'toilet' ? 'Toilet' : stop.type === 'metro' ? 'Metro' : stop.type === 'train' ? 'Train' : (stop.address || stop.type)}</div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Replaced stop.type with stop.address successfully.');
} else {
  console.log('Target string not found!');
}
