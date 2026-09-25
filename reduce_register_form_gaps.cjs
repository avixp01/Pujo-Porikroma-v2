const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Subtitle margin
code = code.replace(
  /color:\s*'#8c7366',\s*fontSize:\s*'14px',\s*marginBottom:\s*'7px',\s*textAlign:\s*'center'\s*\}\}>\n\s*Signup now/,
  `color: '#8c7366', fontSize: '14px', marginBottom: '5px', textAlign: 'center' }}>\n                      Signup now`
);

// 2. Firstname/Lastname row
code = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*gap:\s*'10px',\s*marginBottom:\s*'12px'\s*\}\}>/,
  `<div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>`
);

// 3. Email address row
code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'12px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Email address<\/label>/,
  `<div style={{ marginBottom: '10px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Email address</label>`
);

// 4. Confirm Email address row
code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'12px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Confirm Email address<\/label>/,
  `<div style={{ marginBottom: '10px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Confirm Email address</label>`
);

// 5. Password row
code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'12px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Password<\/label>/,
  `<div style={{ marginBottom: '10px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Password</label>`
);

// 6. Confirm password row
code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'12px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Confirm password<\/label>/,
  `<div style={{ marginBottom: '10px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Confirm password</label>`
);

// 7. Date of Birth row
code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'16px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Date of Birth<\/label>/,
  `<div style={{ marginBottom: '14px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</label>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing between register form rows by 2px.');
