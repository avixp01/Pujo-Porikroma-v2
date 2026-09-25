const fs = require('fs');
let code = fs.readFileSync('src/components/EditProfilePopup.jsx', 'utf8');

// 1. Add Pencil to lucide-react import
code = code.replace("import { ChevronLeft, ChevronDown } from 'lucide-react';", "import { ChevronLeft, ChevronDown, Pencil } from 'lucide-react';");

// 2. Add handleGoogleSync and avatar state
const targetInit = `const [showDatePicker, setShowDatePicker] = useState(false);`;
const replacementInit = `const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatarSrc);
  
  const handleGoogleSync = () => {
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
code = code.replace(targetInit, replacementInit);

// 3. Update Avatar Wrapper to include pencil and update img src to currentAvatar
const targetAvatar = `<div className="edit-profile-avatar-wrapper">
              <img src={avatarSrc} alt="User Avatar" className="edit-profile-avatar" />
            </div>
            <p className="edit-profile-avatar-text">Photo from your Google account</p>`;
const replacementAvatar = `<div className="edit-profile-avatar-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
              <img src={currentAvatar} alt="User Avatar" className="edit-profile-avatar" />
              <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#33221c', border: '1px solid #ff8a00', borderRadius: '50%', padding: '4px', display: 'flex', cursor: 'pointer' }} onClick={handleGoogleSync}>
                <Pencil size={12} color="#ffb366" />
              </div>
            </div>
            <p className="edit-profile-avatar-text" onClick={handleGoogleSync} style={{ cursor: 'pointer' }}>Photo from your Google account</p>`;
code = code.replace(targetAvatar, replacementAvatar);

// 4. Disable Email input
const targetEmail = `value={email} 
                onChange={(e) => setEmail(e.target.value)}`;
const replacementEmail = `value={email} 
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                onChange={(e) => setEmail(e.target.value)}`;
code = code.replace(targetEmail, replacementEmail);

fs.writeFileSync('src/components/EditProfilePopup.jsx', code, 'utf8');
console.log('EditProfilePopup updated successfully.');
