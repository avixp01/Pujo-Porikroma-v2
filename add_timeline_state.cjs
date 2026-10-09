const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const \[isRouteMenuOpen, setIsRouteMenuOpen\] = useState\(false\);/g;
const replacement = `const [isRouteMenuOpen, setIsRouteMenuOpen] = useState(false);\n  const [timelineMenuOpenIdx, setTimelineMenuOpenIdx] = useState(null);`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added state!");
} else {
    console.log("Could not find the state line!");
}
