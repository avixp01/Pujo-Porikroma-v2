const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const handleGoogleLoginStr = `
  const handleGoogleLogin = () => {
    try {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: '1234567890-mockclientid.apps.googleusercontent.com', // Replace with your actual Google Client ID
          callback: (response) => {
            console.log("Encoded JWT ID token: " + response.credential);
            // On success, we let the user in
            onLogin(); 
          }
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Google prompt could not be displayed or was skipped. Reason:', notification.getNotDisplayedReason() || notification.getSkippedReason());
          }
        });
      } else {
        console.warn("Google Identity Services script not loaded.");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };
`;

const insertBefore = `  const handleLoginSubmit = async (e) => {`;
code = code.replace(insertBefore, handleGoogleLoginStr + '\n' + insertBefore);

const oldBtn = `<button onClick={onLogin} style={{
                  width: '100%',
                  backgroundColor: '#ffffff',`;

const newBtn = `<button type="button" onClick={handleGoogleLogin} style={{
                  width: '100%',
                  backgroundColor: '#ffffff',`;

code = code.replace(oldBtn, newBtn);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Google login integrated.');
