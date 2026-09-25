const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const regex = /callback:\s*\(\s*response\s*\)\s*=>\s*\{[\s\S]*?onLogin\(\);\s*\}/;

const replacementStr = `callback: (response) => {
              console.log("Encoded JWT ID token: " + response.credential);
              try {
                const payload = JSON.parse(atob(response.credential.split('.')[1]));
                const userObj = {
                  firstname: payload.given_name || '',
                  lastname: payload.family_name || '',
                  email: payload.email || '',
                  picture: payload.picture || '',
                  isGoogle: true
                };
                localStorage.setItem('pujoUser', JSON.stringify(userObj));
              } catch(e) {
                console.error('Failed to parse Google JWT');
              }
              onLogin(); 
            }`;

code = code.replace(regex, replacementStr);
fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('LoginModal updated with JWT parsing using regex.');
