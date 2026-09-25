const fs = require('fs');

let loginCode = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

loginCode = loginCode.replace(
  /const data = await response\.json\(\);\s*if \(data\.success\) \{\s*console\.log\('%c\[DEVELOPER FALLBACK\]'/g,
  `const data = await response.json();\n        if (data.rateLimited) return;\n        if (data.success) {\n            console.log('%c[DEVELOPER FALLBACK]'`
);

fs.writeFileSync('src/components/LoginModal.jsx', loginCode, 'utf8');
console.log("Regex replaced.");
