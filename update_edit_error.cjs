const fs = require('fs');
let code = fs.readFileSync('src/components/EditProfilePopup.jsx', 'utf8');

// Update props to receive setAvatarSrc
const targetProps = `const EditProfilePopup = ({ onClose, avatarSrc, initialName = 'USER', initialEmail = 'user@gmail.com' }) => {`;
const replacementProps = `const EditProfilePopup = ({ onClose, avatarSrc, setAvatarSrc, initialName = 'USER', initialEmail = 'user@gmail.com' }) => {`;
code = code.replace(targetProps, replacementProps);

// Update handleGoogleSync to call setAvatarSrc
const targetSetAvatar1 = `setCurrentAvatar(payload.picture);`;
const replacementSetAvatar1 = `setCurrentAvatar(payload.picture);
                  if (setAvatarSrc) setAvatarSrc(payload.picture);`;
code = code.replace(targetSetAvatar1, replacementSetAvatar1);

const targetSetAvatar2 = `setCurrentAvatar(avatarSrc);`;
const replacementSetAvatar2 = `setCurrentAvatar(avatarSrc);
                  if (setAvatarSrc) setAvatarSrc(avatarSrc);`;
code = code.replace(targetSetAvatar2, replacementSetAvatar2);

// Add onError to EditProfilePopup img
const targetImg = `<img src={currentAvatar} alt="User Avatar" className="edit-profile-avatar" />`;
const replacementImg = `<img src={currentAvatar} alt="User Avatar" className="edit-profile-avatar" onError={(e) => {
                // If it fails to load, fall back to the safe avatarSrc we started with
                setCurrentAvatar(avatarSrc);
                if (setAvatarSrc) setAvatarSrc(avatarSrc);
              }} />`;
code = code.replace(targetImg, replacementImg);

fs.writeFileSync('src/components/EditProfilePopup.jsx', code, 'utf8');
console.log('EditProfilePopup updated with setAvatarSrc and onError.');
