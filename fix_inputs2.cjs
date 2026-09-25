const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetStr = `{[...Array(5)].map((_, i) => (
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
                  ))}`;

const replacementStr = `{[...Array(5)].map((_, i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength="1"
                      value={codeDigits[i]}
                      onChange={(e) => {
                        const newDigits = [...codeDigits];
                        newDigits[i] = e.target.value;
                        setCodeDigits(newDigits);
                        if (e.target.value && i < 4) {
                          const nextInput = e.target.parentElement.children[i + 1];
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !codeDigits[i] && i > 0) {
                          const prevInput = e.target.parentElement.children[i - 1];
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      style={{
                        width: '45px',
                        height: '55px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid #4a2f22',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: '600',
                        textAlign: 'center',
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                  ))}`;

const parts = code.split(targetStr);
if (parts.length > 1) {
  // Replace only the first occurrence
  code = parts[0] + replacementStr + parts.slice(1).join(targetStr);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Successfully replaced first input array via split.');
} else {
  console.log('Failed to split. targetStr not found.');
}
