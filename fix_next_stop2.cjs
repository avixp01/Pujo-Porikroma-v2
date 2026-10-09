const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex1 = /([ \t]*)\}\)\}\s*<\/div>\s*<button style=\{\{ width: '100%', padding: '16px', backgroundColor: '#fff7ed'/;
const regex2 = /([ \t]*)<\/button>\s*<\/div>\s*\{\/\* FAB Overlay \*\/\}/;

if (regex1.test(content) && regex2.test(content)) {
    content = content.replace(regex1, (match, p1) => {
        return p1 + '})}\n' + p1 + '<button style={{ width: \'100%\', padding: \'16px\', backgroundColor: \'#fff7ed\'';
    });
    
    content = content.replace(regex2, (match, p1) => {
        return p1 + '</button>\n' + p1 + '</div>\n' + p1 + '</div>\n\n' + p1 + '{/* FAB Overlay */}';
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed the Next stop button via regex!");
} else {
    console.log("Could not match the regexes.");
}
