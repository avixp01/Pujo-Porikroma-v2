const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Match the <div className="flex px-5 py-2 gap-4"...> block down to its closing </div>
// and the following newline/spaces.
const regex = /\s*<div className="flex px-5 py-2 gap-4"[^>]*>[\s\S]*?<\/div>/;

if (regex.test(code)) {
  code = code.replace(regex, '');
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully removed the three-icon row using regex.');
} else {
  console.log('Regex did not match!');
}
