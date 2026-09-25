const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Add reservedEmails state
code = code.replace(
  `const [reservedNames, setReservedNames] = useState([]);`,
  `const [reservedNames, setReservedNames] = useState([]);\n  const [reservedEmails, setReservedEmails] = useState([]);`
);

// 2. Update fetch logic
code = code.replace(
  `setReservedNames(data.reservedNames);`,
  `setReservedNames(data.reservedNames);\n            setReservedEmails(data.reservedEmails || []);`
);

// 3. Add derived logic
code = code.replace(
  `const isLastnameTaken = regLastname && reservedNames.includes(regLastname.toLowerCase().trim());`,
  `const isLastnameTaken = regLastname && reservedNames.includes(regLastname.toLowerCase().trim());\n  const isEmailTaken = regEmail && reservedEmails.includes(regEmail.toLowerCase().trim());\n  const isConfirmEmailTaken = regConfirmEmail && reservedEmails.includes(regConfirmEmail.toLowerCase().trim());`
);

// 4. Block submission
code = code.replace(
  `if (isFirstnameTaken || isLastnameTaken) {`,
  `if (isEmailTaken || isConfirmEmailTaken) {\n        alert("This email is already registered! Please log in.");\n        return;\n      }\n      if (isFirstnameTaken || isLastnameTaken) {`
);

// 5. Update Email label and input
const oldEmailLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Email address</label>`;
const newEmailLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px', justifyContent: 'space-between', alignItems: 'center' }}><span>Email address</span> {isEmailTaken && <span style={{ color: '#ff3333', fontSize: '11px', marginLeft: '5px' }}>Email exist</span>}</label>`;
code = code.replace(oldEmailLabel, newEmailLabel);

const oldEmailInput = `<input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={inputStyle} />`;
const newEmailInput = `<input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{...inputStyle, borderColor: isEmailTaken ? '#ff3333' : inputStyle.borderColor}} />`;
code = code.replace(oldEmailInput, newEmailInput);

// 6. Update Confirm Email label and input
const oldConfirmLabel = `<label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                        Confirm Email address
                          {regConfirmEmail && regEmail !== regConfirmEmail && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>not matched</span>
                          )}
                        </label>`;
const newConfirmLabel = `<label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
                          <div>Confirm Email address
                          {regConfirmEmail && regEmail !== regConfirmEmail && (
                            <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>not matched</span>
                          )}</div>
                          {isConfirmEmailTaken && <span style={{ color: '#ff3333', fontSize: '11px', marginLeft: '5px' }}>Email exist</span>}
                        </label>`;
code = code.replace(oldConfirmLabel, newConfirmLabel);

const oldConfirmInput = `<input type="email" value={regConfirmEmail} onChange={(e) => setRegConfirmEmail(e.target.value)} required style={inputStyle} />`;
const newConfirmInput = `<input type="email" value={regConfirmEmail} onChange={(e) => setRegConfirmEmail(e.target.value)} required style={{...inputStyle, borderColor: isConfirmEmailTaken ? '#ff3333' : inputStyle.borderColor}} />`;
code = code.replace(oldConfirmInput, newConfirmInput);


fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Injected global email existence validation UI!');
