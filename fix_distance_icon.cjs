const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s-8-4\.5-8-11\.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8\.2c0 7\.3-8 11\.8-8 11\.8z"\/><circle cx="12" cy="10" r="3"\/><\/svg>/g;

const replacement = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22L10 2"></path><path d="M20 22L14 2"></path><path d="M12 22v-4"></path><path d="M12 13v-4"></path></svg>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Replaced icon with road logo!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the icon!");
}
