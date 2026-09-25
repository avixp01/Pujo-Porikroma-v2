const fs = require('fs');
let code = fs.readFileSync('src/components/EditProfilePopup.jsx', 'utf8');

const targetStr = `                if (payload.picture) {
                  setCurrentAvatar(payload.picture);
                  const storedUserStr = localStorage.getItem('pujoUser');
                  if (storedUserStr) {
                    const storedUser = JSON.parse(storedUserStr);
                    storedUser.picture = payload.picture;
                    localStorage.setItem('pujoUser', JSON.stringify(storedUser));
                  } else {
                    localStorage.setItem('pujoUser', JSON.stringify({
                      firstname: payload.given_name || '',
                      lastname: payload.family_name || '',
                      email: payload.email || '',
                      picture: payload.picture,
                      isGoogle: true
                    }));
                  }
                }`;

const replacementStr = `                if (payload.picture && !payload.picture.includes('default-user')) {
                  setCurrentAvatar(payload.picture);
                  const storedUserStr = localStorage.getItem('pujoUser');
                  if (storedUserStr) {
                    const storedUser = JSON.parse(storedUserStr);
                    storedUser.picture = payload.picture;
                    localStorage.setItem('pujoUser', JSON.stringify(storedUser));
                  } else {
                    localStorage.setItem('pujoUser', JSON.stringify({
                      firstname: payload.given_name || '',
                      lastname: payload.family_name || '',
                      email: payload.email || '',
                      picture: payload.picture,
                      isGoogle: true
                    }));
                  }
                } else {
                  // Revert to default website cartoon avatar
                  setCurrentAvatar(avatarSrc);
                  const storedUserStr = localStorage.getItem('pujoUser');
                  if (storedUserStr) {
                    const storedUser = JSON.parse(storedUserStr);
                    delete storedUser.picture;
                    localStorage.setItem('pujoUser', JSON.stringify(storedUser));
                  }
                }`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/EditProfilePopup.jsx', code, 'utf8');
console.log('Updated EditProfilePopup to handle default Google avatars.');
