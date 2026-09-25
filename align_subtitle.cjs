const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px' \}\}>/g,
  '<div className="text-[12px] truncate" style={{ color: \'#6b7280\', marginTop: \'2px\', marginLeft: \'23px\' }}>'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Aligned subtitle text with main title (marginLeft: 23px).');
