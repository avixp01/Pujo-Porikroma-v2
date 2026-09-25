const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// Replace the ArrowRight component with text ">"
const regex = /<span style=\{\{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px', transform: 'translateZ\(0\)', backfaceVisibility: 'hidden' \}\}>\s*<ArrowRight size=\{22\} color="white" style=\{\{ flexShrink: 0 \}\} \/>\s*<\/span>/;

const replacement = `<span style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px', fontSize: '16px', fontWeight: 'normal', color: 'white', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>&gt;</span>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Replaced ArrowRight with text chevron");
