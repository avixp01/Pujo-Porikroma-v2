const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('const [activeTimelineMenu, setActiveTimelineMenu] = useState(null);')) {
    content = content.replace(
        'const [isEditingRoute, setIsEditingRoute] = useState(false);',
        'const [isEditingRoute, setIsEditingRoute] = useState(false);\n  const [activeTimelineMenu, setActiveTimelineMenu] = useState(null);'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log("Injected missing state!");
} else {
    console.log("State already exists.");
}
