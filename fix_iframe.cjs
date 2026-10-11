const fs = require('fs');
let code = fs.readFileSync('src/components/MusicPlayer.jsx', 'utf8');

const oldStyle = `<div style={{ position: 'absolute', zIndex: -1000, top: '-9999px', left: '-9999px', width: '200px', height: '200px', opacity: 1, visibility: 'visible' }}>`;
const newStyle = `<div style={{ position: 'absolute', zIndex: -1000, top: '0px', left: '0px', width: '1px', height: '1px', opacity: 0.01, pointerEvents: 'none', overflow: 'hidden' }}>`;

if (code.includes(oldStyle)) {
    code = code.replace(oldStyle, newStyle);
    fs.writeFileSync('src/components/MusicPlayer.jsx', code, 'utf8');
    console.log('Fixed iframe positioning for mobile autoplay!');
} else {
    console.log('Could not find old style string.');
}
