const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

code = code.replace(
  /cid: 'pujologo'/,
  `cid: 'pujologo',\n              contentDisposition: 'inline'`
);

fs.writeFileSync('server.js', code, 'utf8');
console.log('Added contentDisposition: inline');
