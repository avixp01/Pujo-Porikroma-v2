const fs = require('fs');

// Read the original file, removing the trailing garbage appended by PowerShell
let code = fs.readFileSync('src/components/MapPage.css');
// Convert to string and find the broken part (it starts with `.route-timeline-list::-webkit-scrollbar` with null bytes)
let codeStr = code.toString('utf8');

// The file might contain null bytes from UTF-16
const brokenIndex = codeStr.indexOf('\0');
if (brokenIndex !== -1) {
    // Find a safe place to truncate before the broken part.
    // Let's just find the last valid closing brace before the broken part
    const cleanStr = codeStr.replace(/\0/g, ''); // strip null bytes
    
    // Find where the appended part starts
    const appendedStart = cleanStr.lastIndexOf('.route-timeline-list::-webkit-scrollbar');
    if (appendedStart !== -1) {
        codeStr = cleanStr.substring(0, appendedStart);
    }
} else {
    // maybe it didn't use null bytes but spaces?
    const appendedStart = codeStr.lastIndexOf('. r o u t e');
    if (appendedStart !== -1) {
        codeStr = codeStr.substring(0, appendedStart);
    }
}

// Append the clean CSS
const cleanAppend = `
.route-timeline-list::-webkit-scrollbar {
  display: none;
}
.route-timeline-list {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`;

fs.writeFileSync('src/components/MapPage.css', codeStr.trim() + '\n' + cleanAppend, 'utf8');
console.log('Fixed CSS encoding and appended scrollbar hiding.');
