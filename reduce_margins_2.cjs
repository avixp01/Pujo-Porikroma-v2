const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Title margin
code = code.replace(/margin: '0 0 20px 0'/g, "margin: '0 0 16px 0'");

// Username field margin
code = code.replace(/<div style=\{\{ marginBottom: '16px' \}\}>\s*<label style=\{\{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '15px', fontWeight: '500', marginBottom: '4px' \}\}>/g, 
"<div style={{ marginBottom: '12px' }}>\n              <label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>");

// Password field margin is already 8px. Leave it or reduce? 8px is pretty tight. Let's make it 8px.
// Wait, the wrapper was 8px. I'll make it 6px.
code = code.replace(/<div style=\{\{ marginBottom: '8px' \}\}>\s*<label style=\{\{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '15px', fontWeight: '500', marginBottom: '4px' \}\}>/g, 
"<div style={{ marginBottom: '6px' }}>\n              <label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>");

// Forgot password margin
code = code.replace(/<div style=\{\{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' \}\}>/g, 
"<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>");

// Sign in button margin
code = code.replace(/marginBottom: '16px',\s*boxShadow: '0 4px 16px rgba\(255, 107, 0, 0.4\)'/g, 
"marginBottom: '12px',\n              boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'");

// Separator margin
code = code.replace(/<div style=\{\{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '16px' \}\}>/g, 
"<div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '12px' }}>");

// Google button margin
code = code.replace(/justifyContent: 'center',\s*cursor: 'pointer',\s*marginBottom: '20px'/g, 
"justifyContent: 'center',\n            cursor: 'pointer',\n            marginBottom: '16px'");

// Padding
code = code.replace(/padding: '30px 24px'/g, "padding: '24px 20px'");

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced margins even further in LoginModal.jsx');
