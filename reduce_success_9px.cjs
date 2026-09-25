const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldSuccessBlock = `{view === 'verify_success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff8a00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '4px', boxShadow: '0 0 20px rgba(255, 107, 0, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ffb366" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 0px 0', textAlign: 'center' }}>
                  Welcome to Pujo Porikroma
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 2px 0' }}>
                  Your account has been successfully created and verified!
                </p>
                
              </div>
            )}`;

const newSuccessBlock = `{view === 'verify_success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff8a00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '4px', boxShadow: '0 0 20px rgba(255, 107, 0, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ffb366" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 0px 0', textAlign: 'center' }}>
                  Welcome to Pujo Porikroma
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 -7px 0' }}>
                  Your account has been successfully created and verified!
                </p>
                
              </div>
            )}`;

if (code.includes(oldSuccessBlock)) {
  code = code.replace(oldSuccessBlock, newSuccessBlock);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Reduced verify_success bottom margin by 9px.');
} else {
  console.log('Could not find exact verify_success block.');
}
