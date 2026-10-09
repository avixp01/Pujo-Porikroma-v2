const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Restore routes-content paddingBottom to 100px
content = content.replace(
    /className="routes-content" style=\{\{ paddingBottom: '0'/g,
    'className="routes-content" style={{ paddingBottom: \'100px\''
);

// 2. Remove paddingBottom from route-timeline-list
content = content.replace(
    /className="route-timeline-list" style=\{\{ position: 'relative', flex: 1, overflowY: 'auto', paddingBottom: '120px' \}\}/g,
    'className="route-timeline-list" style={{ position: \'relative\', flex: 1, overflowY: \'auto\' }}'
);

// 3. Move </div> back to before the button
const regexMove = /([ \t]*)\}\)\}\s*(<button style=\{\{ width: '100%', padding: '16px', backgroundColor: '#fff7ed'.*?<\/button>)\s*<\/div>/s;
if (regexMove.test(content)) {
    content = content.replace(regexMove, (match, p1, p2) => {
        return p1 + '})}\n' + p1 + '</div>\n\n' + p1 + p2;
    });
    console.log("Restored </div> position.");
} else {
    console.log("Could not find the button and </div> structure to revert.");
}

fs.writeFileSync(file, content, 'utf8');
console.log("Fixed the layout for the Next stop button.");
