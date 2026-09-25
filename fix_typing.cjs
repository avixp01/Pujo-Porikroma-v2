const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const badInput = `onChange={(e) => handleCodeChange(index, e.target.value, 'reset')}
                      onKeyDown={(e) => handleCodeKeyDown(index, e, 'reset')}`;

const goodInput = `onChange={(e) => {
                        if (/[^0-9]/.test(e.target.value)) return;
                        const newDigits = [...codeDigits];
                        newDigits[index] = e.target.value;
                        setCodeDigits(newDigits);
                        if (e.target.value && index < 4) {
                          const nextInput = document.getElementById(\`reset-code-\${index + 1}\`);
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
                          const prevInput = document.getElementById(\`reset-code-\${index - 1}\`);
                          if (prevInput) prevInput.focus();
                        }
                      }}`;

if (code.includes(badInput)) {
  code = code.replace(badInput, goodInput);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Fixed verify code typing bug!');
} else {
  console.log('Could not find the bad input handlers.');
}
