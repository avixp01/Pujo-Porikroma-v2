const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetStr = "<button onClick={onLogin} style={{\n                  width: '100%',\n                  backgroundColor: '#ffffff',";
const replacementStr = "<button type=\"button\" onClick={handleGoogleLogin} style={{\n                  width: '100%',\n                  backgroundColor: '#ffffff',";

if(code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found.');
  // let's try a broader match
  const match = code.match(/<button onClick=\{onLogin\} style=\{\{[\s\S]*?Continue with Google/);
  if (match) {
    let replaced = match[0].replace('onClick={onLogin}', 'type="button" onClick={handleGoogleLogin}');
    code = code.replace(match[0], replaced);
    fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
    console.log('Replaced via regex match.');
  }
}
