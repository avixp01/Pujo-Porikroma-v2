const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Replacement 1: Text below Title
code = code.replace(
  `                <p style={{
                  color: '#8c7366',
                  fontSize: '14px',
                  textAlign: 'left',
                  lineHeight: '1.5',
                  margin: '0 0 24px 0'
                }}>`,
  `                <p style={{
                  color: '#8c7366',
                  fontSize: '14px',
                  textAlign: 'left',
                  lineHeight: '1.5',
                  margin: '0 0 19px 0'
                }}>`
);

// Replacement 2: Email container
code = code.replace(
  `                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email</label>`,
  `                <div style={{ marginBottom: '11px' }}>
                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email</label>`
);

// Replacement 3: Password container
code = code.replace(
  `                <div style={{ marginBottom: '16px', position: 'relative' }}>
                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password</label>`,
  `                <div style={{ marginBottom: '11px', position: 'relative' }}>
                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password</label>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced margins by 5px in reset_password view.');
