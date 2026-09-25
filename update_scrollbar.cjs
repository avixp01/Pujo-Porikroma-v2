const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetCSS = `            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: #4a2f22; border-radius: 10px; }`;

const replaceCSS = `            ::-webkit-scrollbar { width: 4px; }
            ::-webkit-scrollbar-track { background: transparent; margin: 25px 0; }
            ::-webkit-scrollbar-thumb { background: #4a2f22; border-radius: 10px; }`;

if (code.includes(targetCSS)) {
    code = code.replace(targetCSS, replaceCSS);
    fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
    console.log("Updated scrollbar CSS");
} else {
    console.log("Could not find scrollbar CSS");
}
