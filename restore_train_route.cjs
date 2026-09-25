const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const navTarget = `<button className="btn-navigate" style={{ flex: (!selectedLocation || selectedLocation.type === 'pandal') ? undefined : 1 }}>`;
const navReplacement = `<button className="btn-navigate" style={{ flex: (!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') ? undefined : 1 }}>`;

const routeTarget = `{(!selectedLocation || selectedLocation.type === 'pandal') && (
                <button className="btn-route">`;
const routeReplacement = `{(!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') && (
                <button className="btn-route">`;

code = code.replace(navTarget, navReplacement);
code = code.replace(routeTarget, routeReplacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully restored Route button for train stations");
