const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ display: 'flex', gap: '12px', color: '#9ca3af' \}\}>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"><\/circle><circle cx="12" cy="5" r="1"><\/circle><circle cx="12" cy="19" r="1"><\/circle><\/svg>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"><\/line><line x1="3" y1="6" x2="21" y2="6"><\/line><line x1="3" y1="18" x2="21" y2="18"><\/line><\/svg>\s*<\/div>/g;

const replacement = `<div style={{ display: 'flex', color: '#9ca3af' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                              </div>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Removed hamburger drag handle!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the SVGs!");
}
