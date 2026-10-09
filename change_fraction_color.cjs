const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<h3 style=\{\{\s*fontSize:\s*'16px',\s*fontWeight:\s*'bold',\s*margin:\s*0,\s*color:\s*'#1f2937'\s*\}\}>Route timeline \(\{plannedStops\.length\}\)\s*<span style=\{\{\s*color:\s*'#9ca3af',\s*fontSize:\s*'13px',\s*fontWeight:\s*'normal',\s*marginLeft:\s*'4px'\s*\}\}>\{plannedStops\.length\}\/10<\/span><\/h3>/g;

const replacement = `<h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Route timeline ({plannedStops.length}) <span style={{ color: plannedStops.length >= 10 ? '#7c2d12' : '#9ca3af', fontSize: '13px', fontWeight: plannedStops.length >= 10 ? 'bold' : 'normal', marginLeft: '4px' }}>{plannedStops.length}/10</span></h3>`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done color change');
} else {
  console.log('not found');
}
