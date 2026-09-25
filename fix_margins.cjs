const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldP = `<p style={{
                color: '#8c7366',
                fontSize: '14px',
                textAlign: 'left',
                lineHeight: '1.5',
                margin: '0 0 8px 0'
                  }}>`;
const newP = `<p style={{
                color: '#8c7366',
                fontSize: '14px',
                textAlign: 'left',
                lineHeight: '1.5',
                margin: '0 0 2px 0'
                  }}>`;

const oldDiv = `<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>`;
const newDiv = `<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>`;

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
                  marginBottom: '8px',
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
                  marginBottom: '2px',
                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>`;


let firstIndexP = code.indexOf(oldP);
let secondIndexP = code.indexOf(oldP, firstIndexP + 1);

// We want to replace the `<p>` in `verify_reset_code`. Is it the only one with this exact formatting?
// Let's replace specifically in the block.
const blockStart = code.indexOf("view === 'verify_reset_code'");
const blockEnd = code.indexOf("view === 'login_error'", blockStart);

let block = code.substring(blockStart, blockEnd);

block = block.replace(oldP, newP);
block = block.replace(oldDiv, newDiv);
block = block.replace(oldBtn, newBtn);

code = code.substring(0, blockStart) + block + code.substring(blockEnd);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Fixed margins!');
