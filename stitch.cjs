const fs = require('fs');

const headFile = 'MapPage_HEAD.jsx';
const currFile = 'src/components/MapPage.jsx';

const headContent = fs.readFileSync(headFile, 'utf8');
let currContent = fs.readFileSync(currFile, 'utf8');

// The headContent contains the good code from line 116 to 702
// We can extract it by slicing between specific markers.

const startMarker = `  React.useEffect(() => {\n    map.on('dragstart', onDrag);\n    return () => map.off('dragstart', onDrag);\n  }, [map, onDrag]);\n  return null;\n};`;

const endMarker = `  const renderSearchItem = (loc) => {`;

const startIdx = headContent.indexOf(startMarker);
const endIdx = headContent.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
    // We want from the return of MapEvents up to right before renderSearchItem
    const replacementCode = headContent.substring(startIdx + startMarker.length, endIdx);
    
    // In currContent, the corrupted part is from the broken return of MapEvents up to renderSearchItem
    const badStartMarker = `  React.useEffect(() => {\n      map.on('dragstart', onDrag);\n      return (\n`;
    const badEndMarker = `          </div>\n        );\n    };\n\n    const renderOriginObj =`;
    
    const badStartIdx = currContent.indexOf(badStartMarker);
    const badEndIdx = currContent.indexOf(badEndMarker);
    
    if (badStartIdx !== -1 && badEndIdx !== -1) {
        // Splice it!
        // But wait! MapEvents in currContent has spaces.
        // Let's just use regex for the bad part.
    }
}
