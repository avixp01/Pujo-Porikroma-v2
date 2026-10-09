const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<div style=\{\{\s*display:\s*'flex',\s*gap:\s*'12px',\s*color:\s*'#9ca3af'\s*\}\}>\s*<svg[^>]+><circle[^>]+><\/circle><circle[^>]+><\/circle><circle[^>]+><\/circle><\/svg>\s*<svg[^>]+><line[^>]+><\/line><line[^>]+><\/line><line[^>]+><\/line><\/svg>\s*<\/div>/g;

if (regex.test(code)) {
  code = code.replace(regex, (match) => {
    return match.replace(`display: 'flex'`, `display: 'none'`);
  });
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done regex');
} else {
  console.log('not found');
}
