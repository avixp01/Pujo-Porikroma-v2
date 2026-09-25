const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsPopup.jsx', 'utf8');

const targetStr = `<button className="settings-signout-btn">`;
const replacementStr = `<button className="settings-signout-btn" onClick={() => { localStorage.removeItem('pujoUser'); window.location.reload(); }}>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/SettingsPopup.jsx', code, 'utf8');
  console.log('SettingsPopup updated with sign out functionality.');
}
