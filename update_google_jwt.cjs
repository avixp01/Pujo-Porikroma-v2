const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetStr = `            callback: (response) => {
              console.log("Encoded JWT ID token: " + response.credential);
              // On success, we let the user in
              onLogin(); 
            }`;

const replacementStr = `            callback: (response) => {
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
              // On success, we let the user in
              onLogin(); 
            }`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('LoginModal updated with JWT parsing.');
} else {
  console.log('Could not find target string in LoginModal.');
}
