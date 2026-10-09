const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `  const closeModal = () => {
    window.history.back();
  };`;
  
const replaceStr = `  const closeModal = () => {
    setShowMapPage(false);
    setIsMapLoading(false);
    setIsMapFadingOut(false);
    // Push home state so that hardware back won't reopen map
    window.history.pushState({ id: 'home' }, '');
  };`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully updated closeModal in App.jsx");
} else {
    console.log("Could not find closeModal in App.jsx");
}
