const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsPopup.jsx', 'utf8');

const targetUserGender = "const userGender = 'male'; // Can be changed to 'female' to test the female avatars";
const replacementUserGender = `const storedUserStr = localStorage.getItem('pujoUser');
  const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
  const userName = storedUser ? \`\${storedUser.firstname || ''} \${storedUser.lastname || ''}\`.trim() : 'USER';
  const userEmail = storedUser?.email || 'user@gmail.com';
  const userGender = storedUser?.gender || 'male';`;

if(code.includes(targetUserGender)) {
  code = code.replace(targetUserGender, replacementUserGender);
}

const targetUsername = `<h2 className="settings-username">USER</h2>`;
const replacementUsername = `<h2 className="settings-username">{userName || 'USER'}</h2>`;
code = code.replace(targetUsername, replacementUsername);

const targetEmail = `<p className="settings-email">user@gmail.com</p>`;
const replacementEmail = `<p className="settings-email">{userEmail}</p>`;
code = code.replace(targetEmail, replacementEmail);

fs.writeFileSync('src/components/SettingsPopup.jsx', code, 'utf8');
console.log('SettingsPopup updated successfully!');
