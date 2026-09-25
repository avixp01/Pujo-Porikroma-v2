const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsPopup.jsx', 'utf8');

code = code.replace("const [avatarSrc] = useState(() => {", "const [avatarSrc, setAvatarSrc] = useState(() => {");

const targetEditProfile = `<EditProfilePopup 
          onClose={() => closePopup(setShowEditProfile)} 
          avatarSrc={avatarSrc}
          initialName={userName}
          initialEmail={userEmail}
        />`;
const replacementEditProfile = `<EditProfilePopup 
          onClose={() => closePopup(setShowEditProfile)} 
          avatarSrc={avatarSrc}
          setAvatarSrc={setAvatarSrc}
          initialName={userName}
          initialEmail={userEmail}
        />`;

code = code.replace(targetEditProfile, replacementEditProfile);

// Add onError handler to SettingsPopup img
const targetImg = `<img src={avatarSrc} alt="User Avatar" className="settings-avatar" />`;
const replacementImg = `<img src={avatarSrc} alt="User Avatar" className="settings-avatar" onError={(e) => {
              const maleAvatars = ['/avatar-male-1.png','/avatar-male-2.png','/avatar-male-3.png','/user logo1.png','/user logo3.png','/user logo4.png','/user logo6.png'];
              const femaleAvatars = ['/avatar-female-1.png','/user logo2.png','/user logo5.png','/user logo7.png'];
              const arrayToUse = userGender === 'female' ? femaleAvatars : maleAvatars;
              const fallback = arrayToUse[Math.floor(Math.random() * arrayToUse.length)];
              setAvatarSrc(fallback);
              
              // Also clean up localstorage so it doesnt happen again
              const storedUserStr = localStorage.getItem('pujoUser');
              if (storedUserStr) {
                const storedUser = JSON.parse(storedUserStr);
                delete storedUser.picture;
                localStorage.setItem('pujoUser', JSON.stringify(storedUser));
              }
            }} />`;
code = code.replace(targetImg, replacementImg);

fs.writeFileSync('src/components/SettingsPopup.jsx', code, 'utf8');
console.log('SettingsPopup updated with setAvatarSrc and onError fallback.');
