const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsPopup.jsx', 'utf8');

const targetAvatar = `const arrayToUse = userGender === 'female' ? femaleAvatars : maleAvatars;
    return arrayToUse[Math.floor(Math.random() * arrayToUse.length)];`;
const replacementAvatar = `if (storedUser?.picture) {
      return storedUser.picture;
    }
    const arrayToUse = userGender === 'female' ? femaleAvatars : maleAvatars;
    return arrayToUse[Math.floor(Math.random() * arrayToUse.length)];`;

code = code.replace(targetAvatar, replacementAvatar);

const targetEditProfile = `<EditProfilePopup 
          onClose={() => closePopup(setShowEditProfile)} 
          avatarSrc={avatarSrc}
        />`;
const replacementEditProfile = `<EditProfilePopup 
          onClose={() => closePopup(setShowEditProfile)} 
          avatarSrc={avatarSrc}
          initialName={userName}
          initialEmail={userEmail}
        />`;

code = code.replace(targetEditProfile, replacementEditProfile);

fs.writeFileSync('src/components/SettingsPopup.jsx', code, 'utf8');
console.log('SettingsPopup updated with avatar logic and props.');
