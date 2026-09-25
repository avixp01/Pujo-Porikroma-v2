const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Add visibility states
if (!code.includes('showRegPassword')) {
  const stateVars = `
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
`;
  code = code.replace(
    /const \[regGender,\s*setRegGender\]\s*=\s*useState\(''\);/,
    `const [regGender, setRegGender] = useState('');\n${stateVars}`
  );
}

// 2. Replace Password block
const oldPasswordBlock = `                  <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Password</label>
                    <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required style={inputStyle} />
                  </div>`;

const newPasswordBlock = `                  <div style={{ marginBottom: '10px', position: 'relative' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                        Password
                        {regPassword.length > 0 && regPassword.length < 8 && (
                          <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>minimum 8 characters</span>
                        )}
                      </label>
                    <input type={showRegPassword ? "text" : "password"} value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required style={{...inputStyle, paddingRight: '40px'}} />
                    <button type="button" onClick={() => {
                      if (!showRegPassword) {
                        setShowRegPassword(true);
                        setTimeout(() => setShowRegPassword(false), 10000);
                      } else {
                        setShowRegPassword(false);
                      }
                    }} style={{ position: 'absolute', right: '12px', top: '28px', background: 'none', border: 'none', color: '#8c7366', cursor: 'pointer', padding: 0 }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {showRegPassword ? (
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        ) : (
                          <>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </>
                        )}
                        {showRegPassword && <circle cx="12" cy="12" r="3"></circle>}
                      </svg>
                    </button>
                  </div>`;

if (code.includes(oldPasswordBlock)) {
  code = code.split(oldPasswordBlock).join(newPasswordBlock);
  console.log("Successfully replaced Password block.");
} else {
  console.log("Failed to find exact Password block string. Will try regex.");
  // Fallback regex
  const regex = /<div style=\{\{ marginBottom: '10px' \}\}>\s*<label style=\{\{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' \}\}>Password<\/label>\s*<input type="password" value=\{regPassword\} onChange=\{\(e\) => setRegPassword\(e\.target\.value\)\} required style=\{inputStyle\} \/>\s*<\/div>/;
  if(regex.test(code)) {
      code = code.replace(regex, newPasswordBlock);
      console.log("Replaced via regex.");
  } else {
      console.log("Regex also failed.");
  }
}


// 3. Replace Confirm Password block
const oldConfirmPasswordBlock = `                  <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                          Confirm password
                        {regConfirmPassword && regPassword !== regConfirmPassword && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>not matched</span>
                          )}
                        </label>
                      <input type="password" value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} required style={inputStyle} />
                  </div>`;

const newConfirmPasswordBlock = `                  <div style={{ marginBottom: '10px', position: 'relative' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                        Confirm password
                        {regConfirmPassword.length > 0 && regConfirmPassword.length < 8 && (
                          <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>minimum 8 characters</span>
                        )}
                        {regConfirmPassword.length > 0 && regPassword !== regConfirmPassword && (
                          <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>not matched</span>
                        )}
                      </label>
                    <input type={showRegConfirmPassword ? "text" : "password"} value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} required style={{...inputStyle, paddingRight: '40px'}} />
                    <button type="button" onClick={() => {
                      if (!showRegConfirmPassword) {
                        setShowRegConfirmPassword(true);
                        setTimeout(() => setShowRegConfirmPassword(false), 10000);
                      } else {
                        setShowRegConfirmPassword(false);
                      }
                    }} style={{ position: 'absolute', right: '12px', top: '28px', background: 'none', border: 'none', color: '#8c7366', cursor: 'pointer', padding: 0 }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {showRegConfirmPassword ? (
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        ) : (
                          <>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </>
                        )}
                        {showRegConfirmPassword && <circle cx="12" cy="12" r="3"></circle>}
                      </svg>
                    </button>
                  </div>`;

if (code.includes(oldConfirmPasswordBlock)) {
  code = code.split(oldConfirmPasswordBlock).join(newConfirmPasswordBlock);
  console.log("Successfully replaced Confirm Password block.");
} else {
  console.log("Failed to find exact Confirm Password block string. Will try regex.");
  // Fallback regex
  const regex = /<div style=\{\{ marginBottom: '10px' \}\}>\s*<label style=\{\{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' \}\}>\s*Confirm password\s*\{regConfirmPassword && regPassword !== regConfirmPassword && \(\s*<span style=\{\{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' \}\}>not matched<\/span>\s*\)\}\s*<\/label>\s*<input type="password" value=\{regConfirmPassword\} onChange=\{\(e\) => setRegConfirmPassword\(e\.target\.value\)\} required style=\{inputStyle\} \/>\s*<\/div>/;
  if(regex.test(code)) {
      code = code.replace(regex, newConfirmPasswordBlock);
      console.log("Replaced via regex.");
  } else {
      console.log("Regex also failed.");
  }
}

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Update script finished.');
