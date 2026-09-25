const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add import
if (!appCode.includes('import LoginModal')) {
  appCode = appCode.replace("import './App.css';", "import LoginModal from './components/LoginModal';\nimport './App.css';");
}

// 2. Add state
if (!appCode.includes('const [isLoggedIn, setIsLoggedIn] = useState(false);')) {
  appCode = appCode.replace('const [showMapPage, setShowMapPage] = useState(false);', 'const [isLoggedIn, setIsLoggedIn] = useState(false);\n  const [showMapPage, setShowMapPage] = useState(false);');
}

// 3. Wrap return
if (!appCode.includes('<LoginModal onLogin={() => setIsLoggedIn(true)} />')) {
  const returnRegex = /return \(\s*<div className="app-container">/;
  appCode = appCode.replace(returnRegex, `return (
    <>
      {!isLoggedIn && <LoginModal onLogin={() => setIsLoggedIn(true)} />}
      {isLoggedIn && (
        <div className="app-container">`);

  // We need to close the wrap at the very end of App.jsx
  // The end of App.jsx is:
  //         </main>
  //       </div>
  //       {showMapPage && <MapPage onClose={closeModal} />}
  //     </div>
  //   );
  // }
  // export default App;

  const endRegex = /<\/div>\s*\);\s*\}\s*export default App;/;
  appCode = appCode.replace(endRegex, `</div>\n      )}\n    </>\n  );\n}\n\nexport default App;`);
}

fs.writeFileSync('src/App.jsx', appCode, 'utf8');
console.log('App.jsx updated with LoginModal');
