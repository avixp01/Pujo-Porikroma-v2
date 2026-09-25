const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const newUseEffect = `  useEffect(() => {
    if (view === 'verify_success') {
      const timer = setTimeout(() => {
        onLogin();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [view, onLogin]);

`;

code = code.replace(
  /  const navigateView = \(newView\) => \{/,
  newUseEffect + "  const navigateView = (newView) => {"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added 5-second auto-login to verify_success.');
