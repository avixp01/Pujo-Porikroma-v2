const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Header
const h1 = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 16px 8px 16px', backgroundColor: 'white' }}>`;
const r_h1 = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 16px 8px 16px', backgroundColor: 'white', flexShrink: 0 }}>`;

// 2. Metrics
const m1 = `<div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 0', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>`;
const r_m1 = `<div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 0', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>`;

// 3. Map
const map1 = `<div style={{ height: '180px', width: '100%', position: 'relative' }}>`;
const r_map1 = `<div style={{ height: '180px', width: '100%', position: 'relative', flexShrink: 0 }}>`;

// 4. Timeline Header (inside the wrapper)
const th1 = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>`;
const r_th1 = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>`;


if (code.includes(h1)) code = code.replace(h1, r_h1);
if (code.includes(m1)) code = code.replace(m1, r_m1);
if (code.includes(map1)) code = code.replace(map1, r_map1);
// Wait, timeline header has multiple occurrences? Let's check.
if (code.includes(th1)) {
  // we only want to replace the one inside the wrapper.
  // Actually, there's only one with exactly this spacing in this block, but let's be careful.
  code = code.replace(th1, r_th1);
}

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done flex shrink');
