const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const targetStr = `          <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', color: '#a69a8b', fontSize: '12px', zIndex: 20, fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>
            <div style={{ marginBottom: '5px', opacity: 0.8 }}>&copy; 2026 Pujo Porikroma. All rights reserved.</div>
            <div style={{ opacity: 0.8 }}>contact us : saikatsom234@gmail.com</div>
          </div>`;

const replacementStr = `          <div style={{ position: 'absolute', bottom: '3px', width: '100%', textAlign: 'center', color: '#a69a8b', fontSize: '14px', zIndex: 20, fontFamily: 'sans-serif', letterSpacing: '1px' }}>
            <div style={{ marginBottom: '5px', opacity: 0.8 }}>&copy; 2026 Pujo Porikroma. All rights reserved.</div>
            <div style={{ opacity: 0.8 }}>contact us : saikatsom234@gmail.com</div>
          </div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/App.jsx', code, 'utf8');
  console.log('Updated footer text styling successfully.');
} else {
  console.log('Target string not found.');
}
