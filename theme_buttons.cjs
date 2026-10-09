const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Change "Done" button color from #dc2626 to #7c2d12
content = content.replace(
    /<button style=\{\{ color: '#dc2626', fontSize: '15px', fontWeight: 'bold' \}\}/g,
    '<button style={{ color: \'#7c2d12\', fontSize: \'15px\', fontWeight: \'bold\' }}'
);

// Change X button background from #fee2e2 to #fef3c7
content = content.replace(
    /style=\{\{ width: '28px', height: '28px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' \}\}/g,
    'style={{ width: \'28px\', height: \'28px\', backgroundColor: \'#fef3c7\', borderRadius: \'50%\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', cursor: \'pointer\' }}'
);

// Change X button stroke from #dc2626 to #7c2d12
content = content.replace(
    /<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5">/g,
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5">'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated button colors to match brownish theme.");
