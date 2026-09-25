const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Add age calculation logic
const logicInsertionPoint = `  const isFirstnameTaken = regFirstname && reservedNames.includes(regFirstname.toLowerCase().trim());`;

const newLogic = `  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };
  const userAge = calculateAge(regDob);
  const isUnderage = userAge !== null && userAge < 17;

  const isFirstnameTaken = regFirstname && reservedNames.includes(regFirstname.toLowerCase().trim());`;

code = code.replace(logicInsertionPoint, newLogic);

// 2. Add validation to submit handler
const submitCheckPoint = `if (isFirstnameTaken || isLastnameTaken) {`;
const submitNewCheck = `if (isUnderage) {
        alert("You must be at least 17 years old to create an account.");
        return;
      }
      if (isFirstnameTaken || isLastnameTaken) {`;

code = code.replace(submitCheckPoint, submitNewCheck);

// 3. Update the UI
const oldDobLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</label>`;
const newDobLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px', justifyContent: 'space-between', alignItems: 'center' }}>Date of Birth {isUnderage && <span style={{ color: '#ff3333', fontSize: '11px', marginLeft: '5px' }}>Not applicable</span>}</label>`;

code = code.replace(oldDobLabel, newDobLabel);

const oldDobInput = `<input type="date" value={regDob} onChange={(e) => setRegDob(e.target.value)} required style={{...inputStyle, colorScheme: 'dark'}} />`;
const newDobInput = `<input type="date" value={regDob} onChange={(e) => setRegDob(e.target.value)} required style={{...inputStyle, colorScheme: 'dark', borderColor: isUnderage ? '#ff3333' : inputStyle.borderColor}} />`;

code = code.replace(oldDobInput, newDobInput);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Frontend age restriction added!');
