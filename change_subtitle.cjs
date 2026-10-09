const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const t1 = '<p className="routes-header-subtitle">0 stops planned</p>';
const r1 = '<p className="routes-header-subtitle">0 of 10 Stops added</p>';

const t2 = "<p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{plannedStops.length} stops planned</p>";
const r2 = `<p style={{ fontSize: '13px', color: plannedStops.length >= 10 ? '#7c2d12' : '#6b7280', margin: 0, fontWeight: plannedStops.length >= 10 ? 'bold' : 'normal' }}>
                      {plannedStops.length >= 10 ? '10 of 10 added - route is full' : \`\${plannedStops.length} of 10 Stops added\`}
                    </p>`;

if (code.includes(t1)) {
  code = code.replace(t1, r1);
  console.log('replaced t1');
} else {
  console.log('t1 not found');
}

if (code.includes(t2)) {
  code = code.replace(t2, r2);
  console.log('replaced t2');
} else {
  console.log('t2 not found');
}

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done subtitle text change');
