const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `      {activeTab === 'routes' && (
        <div className="routes-view-container">
          <div className="routes-content" style={{ paddingBottom: '100px', backgroundColor: '#fafafa', minHeight: '100%' }}>`;

const replaceStr = `      {activeTab === 'routes' && (
        <div className="routes-view-container">
          {plannedStops.length === 0 && (
            <div className="routes-header">
              <div>
                <h2 className="routes-header-title">Your route</h2>
                <p className="routes-header-subtitle">Tonight • 0 stops planned</p>
              </div>
              <div className="routes-menu-container">
                <button 
                  className="routes-header-menu"
                  onClick={() => setIsRouteMenuOpen(!isRouteMenuOpen)}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
                
                {isRouteMenuOpen && (
                  <div className="routes-dropdown-menu">
                    <button 
                      className="routes-dropdown-item"
                      onClick={() => {
                        setIsRouteMenuOpen(false);
                      }}
                    >
                      Clear route
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="routes-content" style={{ paddingBottom: '100px', backgroundColor: '#fafafa', minHeight: '100%' }}>`;

const targetLF = targetStr.replace(/\r\n/g, '\n');
const replaceLF = replaceStr.replace(/\r\n/g, '\n');

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done CRLF');
} else if (code.includes(targetLF)) {
  code = code.replace(targetLF, replaceLF);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done LF');
} else {
  // Let's do it by regex allowing any whitespace between lines
  const regex = /\{\s*activeTab\s*===\s*'routes'\s*&&\s*\(\s*<div\s+className="routes-view-container">\s*<div\s+className="routes-content"\s+style=\{\{\s*paddingBottom:\s*'100px',\s*backgroundColor:\s*'#fafafa',\s*minHeight:\s*'100%'\s*\}\}>/m;
  if (regex.test(code)) {
    code = code.replace(regex, replaceLF);
    fs.writeFileSync('src/components/MapPage.jsx', code);
    console.log('done regex');
  } else {
    console.log('not found');
  }
}
