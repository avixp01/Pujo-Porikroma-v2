const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// Use regex to remove the Hindusthan Park object from the array
code = code.replace(/\s*\{ id: 9, title: "Hindusthan Park", [^\}]+\},/, '');

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Deleted Hindusthan Park card");
