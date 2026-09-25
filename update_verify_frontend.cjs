const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Add state for the 5 digits
if (!code.includes('const [codeDigits, setCodeDigits]')) {
  code = code.replace(
    /const \[regGender,\s*setRegGender\]\s*=\s*useState\(''\);/,
    `const [regGender, setRegGender] = useState('');\n  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '']);`
  );
}

// 2. Add handleVerifySubmit function
if (!code.includes('const handleVerifySubmit')) {
  const verifyFunc = `
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const fullCode = codeDigits.join('');
    if (fullCode.length < 5) {
      alert('Please enter all 5 digits.');
      return;
    }
    
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, code: fullCode })
      });
      const data = await response.json();
      if (data.success) {
        onLogin(); // Log them in successfully
      } else {
        alert(data.error || 'Invalid code. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    }
  };
  `;
  code = code.replace(
    /const handleRegisterSubmit = async \(e\) => \{/,
    `${verifyFunc}\n\n  const handleRegisterSubmit = async (e) => {`
  );
}

// 3. Update the inputs in verify_code view
const oldInputsBlock = `<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '15px' }}>
                  {[...Array(5)].map((_, i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength="1"
                      style={{
                        width: '45px',
                        height: '55px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid #4a2f22',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '24px',
                        fontWeight: '600',
                        textAlign: 'center',
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                  ))}
                </div>`;

const newInputsBlock = `<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '15px' }}>
                  {[...Array(5)].map((_, i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength="1"
                      value={codeDigits[i]}
                      onChange={(e) => {
                        const newDigits = [...codeDigits];
                        newDigits[i] = e.target.value;
                        setCodeDigits(newDigits);
                        // Auto-focus next input
                        if (e.target.value && i < 4) {
                          e.target.nextElementSibling?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Backspace auto-focus previous
                        if (e.key === 'Backspace' && !codeDigits[i] && i > 0) {
                          e.target.previousElementSibling?.focus();
                        }
                      }}
                      style={{
                        width: '45px',
                        height: '55px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid #4a2f22',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '24px',
                        fontWeight: '600',
                        textAlign: 'center',
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                  ))}
                </div>`;

if (code.includes(oldInputsBlock)) {
  code = code.replace(oldInputsBlock, newInputsBlock);
  console.log('Replaced verify_code inputs successfully.');
} else {
  // Regex fallback
  const regex = /<div style=\{\{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '15px' \}\}>\s*\{\[\.\.\.Array\(5\)\]\.map\(\(_, i\) => \(\s*<input\s*key=\{i\}\s*type="text"\s*maxLength="1"\s*style=\{\{\s*width: '45px',\s*height: '55px',\s*backgroundColor: 'rgba\(0, 0, 0, 0\.2\)',\s*border: '1px solid #4a2f22',\s*borderRadius: '12px',\s*color: '#ffffff',\s*fontSize: '24px',\s*fontWeight: '600',\s*textAlign: 'center',\s*outline: 'none',\s*boxShadow: 'inset 0 2px 4px rgba\(0,0,0,0\.1\)'\s*\}\}\s*\/>\s*\)\}\s*<\/div>/;
  if (regex.test(code)) {
    code = code.replace(regex, newInputsBlock);
    console.log('Replaced verify_code inputs via regex.');
  } else {
    console.log('Failed to replace verify_code inputs.');
  }
}

// 4. Update the verify_code button to use handleVerifySubmit
code = code.replace(
  /<button type="button" onClick=\{onLogin\} style=\{\{\s*width: '100%',\s*backgroundColor: '#ff6b00',/g,
  `<button type="button" onClick={view === 'verify_code' ? handleVerifySubmit : onLogin} style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Updated LoginModal.jsx with strict verification logic.');
