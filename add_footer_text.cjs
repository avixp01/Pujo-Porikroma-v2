const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ opacity: 0\.8 \}\}>contact us : saikatsom234@gmail\.com<\/div>/g;
const replacement = `<div style={{ opacity: 0.8 }}>contact us : saikatsom234@gmail.com</div>
            <div style={{ opacity: 0.8, marginTop: '1px' }}>keep supporting · Happy Durga Puja😊</div>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added new footer text!");
} else {
    console.log("Could not find the footer text!");
}
