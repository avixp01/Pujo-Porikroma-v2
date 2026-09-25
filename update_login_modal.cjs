const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetStr = "setView('verify_success');";
const replacementStr = `localStorage.setItem('pujoUser', JSON.stringify(data.user));
          setView('verify_success');`;

// we need to replace the first occurrence in handleLoginSubmit
if (code.includes(targetStr)) {
  const loginSubmitIndex = code.indexOf('const handleLoginSubmit =');
  const viewSuccessIndex = code.indexOf(targetStr, loginSubmitIndex);
  
  if (viewSuccessIndex !== -1) {
    code = code.substring(0, viewSuccessIndex) + replacementStr + code.substring(viewSuccessIndex + targetStr.length);
    fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
    console.log("Updated handleLoginSubmit in LoginModal.jsx");
  } else {
    console.log("Could not find setView('verify_success'); after handleLoginSubmit");
  }
}
