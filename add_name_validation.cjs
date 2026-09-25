const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Add states and variables
const oldStates = `  const [regFirstname, setRegFirstname] = useState('');`;
const newStates = `  const [reservedNames, setReservedNames] = useState([]);
  const [regFirstname, setRegFirstname] = useState('');`;
code = code.replace(oldStates, newStates);

// 2. Add useEffect to fetch reserved names
const oldUseEffect = `  useEffect(() => {
    window.history.replaceState({ modalView: 'login' }, '', '');`;
const newUseEffect = `  useEffect(() => {
    if (view === 'register') {
      fetch('/api/auth/reserved-names')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setReservedNames(data.reservedNames);
          }
        })
        .catch(console.error);
    }
  }, [view]);

  useEffect(() => {
    window.history.replaceState({ modalView: 'login' }, '', '');`;
code = code.replace(oldUseEffect, newUseEffect);

// 3. Add derived logic before return
const returnStatement = `  return (`;
const logic = `  const isFirstnameTaken = regFirstname && reservedNames.includes(regFirstname.toLowerCase().trim());
  const isLastnameTaken = regLastname && reservedNames.includes(regLastname.toLowerCase().trim());
  return (`;
code = code.replace(returnStatement, logic);

// 4. Prevent submission if taken
const oldHandleReg = `    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      if (regEmail !== regConfirmEmail || regPassword !== regConfirmPassword) {`;
const newHandleReg = `    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      if (isFirstnameTaken || isLastnameTaken) {
        alert("Firstname or Lastname is already taken! Please choose a different name.");
        return;
      }
      if (regEmail !== regConfirmEmail || regPassword !== regConfirmPassword) {`;
code = code.replace(oldHandleReg, newHandleReg);

// 5. Update UI labels
const oldFirstnameLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Firstname</label>`;
const newFirstnameLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px', justifyContent: 'space-between', alignItems: 'center' }}>Firstname {isFirstnameTaken && <span style={{ color: '#ff3333', fontSize: '11px', marginLeft: '5px' }}>Already taken</span>}</label>`;
code = code.replace(oldFirstnameLabel, newFirstnameLabel);

const oldLastnameLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Lastname</label>`;
const newLastnameLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px', justifyContent: 'space-between', alignItems: 'center' }}>Lastname {isLastnameTaken && <span style={{ color: '#ff3333', fontSize: '11px', marginLeft: '5px' }}>Already taken</span>}</label>`;
code = code.replace(oldLastnameLabel, newLastnameLabel);

// Add red border to inputs if taken
const oldFirstnameInput = `<input type="text" value={regFirstname} onChange={(e) => setRegFirstname(e.target.value)} required style={inputStyle} />`;
const newFirstnameInput = `<input type="text" value={regFirstname} onChange={(e) => setRegFirstname(e.target.value)} required style={{...inputStyle, borderColor: isFirstnameTaken ? '#ff3333' : inputStyle.borderColor}} />`;
code = code.replace(oldFirstnameInput, newFirstnameInput);

const oldLastnameInput = `<input type="text" value={regLastname} onChange={(e) => setRegLastname(e.target.value)} required style={inputStyle} />`;
const newLastnameInput = `<input type="text" value={regLastname} onChange={(e) => setRegLastname(e.target.value)} required style={{...inputStyle, borderColor: isLastnameTaken ? '#ff3333' : inputStyle.borderColor}} />`;
code = code.replace(oldLastnameInput, newLastnameInput);


fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Injected global name validation UI!');
