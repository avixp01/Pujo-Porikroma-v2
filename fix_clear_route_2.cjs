const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<button\s*className="routes-dropdown-item"\s*onClick=\{\(\) => \{\s*\/\/[^\n]*\s*setIsRouteMenuOpen\(false\);\s*\}\}\s*>\s*Clear route\s*<\/button>/;

if (regex.test(content)) {
    content = content.replace(regex, `<button 
                      className="routes-dropdown-item"
                      onClick={() => {
                        setPlannedStops([]);
                        setIsRouteMenuOpen(false);
                      }}
                    >
                      Clear route
                    </button>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced Clear route logic!");
} else {
    console.log("Regex did not match.");
}
