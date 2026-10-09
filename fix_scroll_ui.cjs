const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. routes-content
content = content.replace(
    /<div className="routes-content" style=\{\{\s*paddingBottom:\s*'100px',\s*backgroundColor:\s*'#fafafa',\s*minHeight:\s*'100%'\s*\}\}>/g,
    '<div className="routes-content" style={{ paddingBottom: \'0\', backgroundColor: \'#fafafa\', display: \'flex\', flexDirection: \'column\', height: \'100%\', overflow: \'hidden\' }}>'
);

// 2. routes-active-itinerary
content = content.replace(
    /<div className="routes-active-itinerary">/g,
    '<div className="routes-active-itinerary" style={{ display: \'flex\', flexDirection: \'column\', flex: 1, height: \'100%\', overflow: \'hidden\' }}>'
);

// 3. The div wrapping the timeline header and list
content = content.replace(
    /<div style=\{\{\s*padding:\s*'20px 16px'\s*\}\}>/g,
    '<div style={{ padding: \'20px 16px 0 16px\', display: \'flex\', flexDirection: \'column\', flex: 1, overflow: \'hidden\' }}>'
);

// 4. The flex container for the timeline header
content = content.replace(
    /<div style=\{\{\s*display:\s*'flex',\s*justifyContent:\s*'space-between',\s*alignItems:\s*'center',\s*marginBottom:\s*'20px'\s*\}\}>/g,
    '<div style={{ display: \'flex\', justifyContent: \'space-between\', alignItems: \'center\', marginBottom: \'20px\', flexShrink: 0 }}>'
);

// 5. route-timeline-list
content = content.replace(
    /<div className="route-timeline-list" style=\{\{\s*position:\s*'relative'\s*\}\}>/g,
    '<div className="route-timeline-list" style={{ position: \'relative\', flex: 1, overflowY: \'auto\', paddingBottom: \'120px\' }}>'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully updated the scroll styles in MapPage.jsx");
