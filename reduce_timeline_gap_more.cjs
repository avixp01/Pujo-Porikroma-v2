const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const itemOuterTarget = /<div key=\{idx\} style=\{\{ display: 'flex', marginBottom: '0', position: 'relative', paddingBottom: '19px' \}\}>/g;
const itemOuterReplace = `<div key={idx} style={{ display: 'flex', marginBottom: '0', position: 'relative', paddingBottom: '14px' }}>`;

const itemInnerTarget = /<div style=\{\{ flex: 1, paddingBottom: '19px', borderBottom: idx < plannedStops\.length - 1 \? '1px solid #f3f4f6' : 'none' \}\}>/g;
const itemInnerReplace = `<div style={{ flex: 1, paddingBottom: '14px', borderBottom: idx < plannedStops.length - 1 ? '1px solid #f3f4f6' : 'none' }}>`;

let replaced = false;

if (itemOuterTarget.test(code)) {
  code = code.replace(itemOuterTarget, itemOuterReplace);
  replaced = true;
  console.log("Replaced outer padding to 14px");
}

if (itemInnerTarget.test(code)) {
  code = code.replace(itemInnerTarget, itemInnerReplace);
  replaced = true;
  console.log("Replaced inner padding to 14px");
}

if (replaced) {
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log("File saved.");
} else {
  console.log("Targets not found!");
}
