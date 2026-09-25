const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// The string in the file currently looks like:
// {(!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category)) && (

const badCondition = `(!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category))`;
const goodCondition = `(!selectedLocation || selectedLocation.type === 'pandal')`;

code = code.replaceAll(badCondition, goodCondition);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully replaced the condition to properly use selectedLocation.type");
