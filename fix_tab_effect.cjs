const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /React\.useEffect\(\(\) => \{\s*if \(activeTab === 'routes'\) \{\s*window\.history\.pushState\(\{ id: 'routes' \}, ''\);\s*\} else if \(window\.history\.state\?\.id === 'routes'\) \{\s*window\.history\.back\(\);\s*\}\s*\}, \[activeTab\]\);/g;

const replacement = `React.useEffect(() => {
    if (activeTab === 'map') {
      setIsEditingStops(false);
    }
    if (activeTab === 'routes') {
      window.history.pushState({ id: 'routes' }, '');
    } else if (window.history.state?.id === 'routes') {
      window.history.back();
    }
  }, [activeTab]);`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated activeTab useEffect!");
} else {
    console.log("Could not find the useEffect!");
}
