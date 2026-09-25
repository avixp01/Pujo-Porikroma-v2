const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Remove the broken logic from the useEffect
const badLogic = `    const isFirstnameTaken = regFirstname && reservedNames.includes(regFirstname.toLowerCase().trim());
  const isLastnameTaken = regLastname && reservedNames.includes(regLastname.toLowerCase().trim());
  return () => {`;

const fixedLogic = `  return () => {`;

code = code.replace(badLogic, fixedLogic);

// 2. Put the logic right before the MAIN return of the component.
// I'll search for the main return statement:
const mainReturnMatch = `  return (
    <div style={{`;

const correctLogicPlacement = `  const isFirstnameTaken = regFirstname && reservedNames.includes(regFirstname.toLowerCase().trim());
  const isLastnameTaken = regLastname && reservedNames.includes(regLastname.toLowerCase().trim());

  return (
    <div style={{`;

code = code.replace(mainReturnMatch, correctLogicPlacement);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Fixed React component crash!');
