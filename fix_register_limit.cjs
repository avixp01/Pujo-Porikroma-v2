const fs = require('fs');

let loginCode = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetReg = `        const data = await response.json();
        if (data.success) {
            console.log('%c[DEVELOPER FALLBACK]'`;

const replacementReg = `        const data = await response.json();
        if (data.rateLimited) return;
        if (data.success) {
            console.log('%c[DEVELOPER FALLBACK]'`;

if (loginCode.includes(targetReg)) {
    loginCode = loginCode.replace(targetReg, replacementReg);
    fs.writeFileSync('src/components/LoginModal.jsx', loginCode, 'utf8');
    console.log("Updated handleRegisterSubmit limit check");
} else {
    console.log("Not found.");
}
