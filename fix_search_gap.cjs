const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="text-\[12px\]" style=\{\{ color: '#6b7280', marginTop: '4px', marginLeft: '23px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' \}\}>/g;
const replacement = `<div className="text-[12px]" style={{ color: '#6b7280', marginTop: '0px', marginLeft: '23px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Reduced gap between title and subtitle in search list!");
} else {
    console.log("Could not find the subtitle div!");
}
