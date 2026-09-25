const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const regex = /\{\[\.\.\.Array\(5\)\]\.map\(\(_, i\) => \(\s*<input\s*key=\{i\}\s*type="text"\s*maxLength="1"\s*style=\{\{\s*width: '45px',\s*height: '55px',\s*backgroundColor: 'rgba\(0, 0, 0, 0\.2\)',\s*border: '1px solid #4a2f22',\s*borderRadius: '12px',\s*color: '#ffffff',\s*fontSize: '24px',\s*fontWeight: '600',\s*textAlign: 'center',\s*outline: 'none',\s*boxShadow: 'inset 0 2px 4px rgba\(0,0,0,0\.1\)'\s*\}\}\s*\/>\s*\)\}\s*/g;

let matchCount = 0;
code = code.replace(regex, (match) => {
  matchCount++;
  if (matchCount === 1) { // Assuming first one is verify_code
    return `{[...Array(5)].map((_, i) => (
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
                        color: '#ffffff',
                        fontSize: '24px',
                        fontWeight: '600',
                        textAlign: 'center',
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                  ))}`;
  }
  return match;
});

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced ' + matchCount + ' input blocks.');
