const fs = require('fs');
let code = fs.readFileSync('src/components/EditProfilePopup.jsx', 'utf8');

const targetStr = `  const handleGoogleSync = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: '49194794217-itqs33ak7u66mgui0pj4tj9bd253gebr.apps.googleusercontent.com',
        callback: (response) => {
          try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            if (payload.picture) {
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
            }
          } catch(e) {}
        }
      });
      window.google.accounts.id.prompt();
    }
  };`;

const replacementStr = `  const handleGoogleSync = async () => {
    try {
      // Force OAuth popup since OneTap prompt() can be suppressed by cooldowns
      if (window.google && window.google.accounts && window.google.accounts.oauth2) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: '49194794217-itqs33ak7u66mgui0pj4tj9bd253gebr.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              // Fetch profile data using the access token
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: \`Bearer \${tokenResponse.access_token}\` }
                });
                const payload = await res.json();
                
                if (payload.picture) {
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
                }
              } catch(e) {
                console.error('Failed to fetch userinfo from Google', e);
              }
            }
          },
        });
        client.requestAccessToken();
      }
    } catch(err) {
      console.error(err);
    }
  };`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/EditProfilePopup.jsx', code, 'utf8');
  console.log('Updated EditProfilePopup to use OAuth popup.');
} else {
  console.log('Could not find target string in EditProfilePopup.jsx');
}
