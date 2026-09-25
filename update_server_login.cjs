const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const oldFind = `const user = users.find(u => u.email === username);`;
const newFind = `const user = users.find(u => 
        u.email === username || 
        (u.firstname && u.firstname.toLowerCase() === username.toLowerCase().trim()) || 
        (u.lastname && u.lastname.toLowerCase() === username.toLowerCase().trim())
      );`;

if (code.includes(oldFind)) {
  code = code.replace(oldFind, newFind);
  fs.writeFileSync('server.js', code, 'utf8');
  console.log('Updated server.js login logic!');
} else {
  console.log('Could not find login find logic.');
}
