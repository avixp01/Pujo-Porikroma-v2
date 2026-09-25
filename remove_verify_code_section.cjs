const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// The section we want to remove starts with the divider and ends with the "Log In</button>" div.
// We only want to remove the one inside the `reset_password` view.
// It is at the end of the file basically.
const sectionToReplace = /<div style=\{\{\s*width:\s*'100%',\s*height:\s*'1px',\s*backgroundColor:\s*'#4a2f22',\s*marginBottom:\s*'24px'\s*\}\}><\/div>[\s\S]*?Log In<\/button>\n\s*<\/div>/;

code = code.replace(sectionToReplace, "");

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully removed the Verify Your Code section from the reset_password view.');
