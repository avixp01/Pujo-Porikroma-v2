const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<button onClick=\{\(\) => setIsRouteNavigationOpen\(false\)\} style=\{\{ background: 'none', border: 'none', marginRight: '16px', cursor: 'pointer' \}\}>\s*<ArrowLeft size=\{24\} \/>\s*<\/button>/g;

const replacement = `<button onClick={() => setIsRouteNavigationOpen(false)} style={{ background: 'none', border: 'none', marginRight: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: '#1f2937' }}>
                  <ArrowLeft size={24} color="#1f2937" />
                </button>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed Back arrow visibility!");
} else {
    console.log("Could not find the back arrow button!");
}
