const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetStr = "'1234567890-mockclientid.apps.googleusercontent.com'";
const replacementStr = "'49194794217-itqs33ak7u66mgui0pj4tj9bd253gebr.apps.googleusercontent.com'";

if(code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Client ID updated successfully.');
} else {
  console.log('Could not find the placeholder Client ID.');
}
