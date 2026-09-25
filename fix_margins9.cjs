const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldP = `<p style={{
                color: '#8c7366',
                fontSize: '14px',
                textAlign: 'left',
                lineHeight: '1.5',
                margin: '0 0 9px 0'
                  }}>`;
const newP = `<p style={{
                color: '#8c7366',
                fontSize: '14px',
                textAlign: 'left',
                lineHeight: '1.5',
                margin: '0 0 10px 0'
                  }}>`;

const oldBtn = `<button type="button" onClick={handleResetVerifySubmit} style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',
                  background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '9px',
                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>`;
const newBtn = `<button type="button" onClick={handleResetVerifySubmit} style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',
                  background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>`;

const blockStart = code.indexOf("view === 'verify_reset_code'");
const blockEnd = code.indexOf("view === 'login_error'", blockStart);

let block = code.substring(blockStart, blockEnd);

block = block.replace(oldP, newP);
block = block.replace(oldBtn, newBtn);

code = code.substring(0, blockStart) + block + code.substring(blockEnd);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Increased margins by 1px!');
