const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldStr = `
                <button onClick={onLogin} style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  color: '#000000',`;

const newStr = `
                <button type="button" onClick={handleGoogleLogin} style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  color: '#000000',`;

code = code.replace(oldStr, newStr);
fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced onClick for Google button.');
