const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');
const target = `                  <button style={{ color: '#4b5563' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                  </button>`;
const replacement = `                  <div style={{ position: 'relative' }}>
                    <button style={{ color: '#4b5563' }} onClick={() => setIsRouteMenuOpen(!isRouteMenuOpen)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                    </button>
                    {isRouteMenuOpen && (
                      <div className="routes-dropdown-menu" style={{ right: 0, top: '100%', position: 'absolute', zIndex: 10 }}>
                        <button 
                          className="routes-dropdown-item"
                          onClick={() => {
                            // Add clear route logic here if needed in the future
                            setIsRouteMenuOpen(false);
                          }}
                        >
                          Clear route
                        </button>
                      </div>
                    )}
                  </div>`;
code = code.replace(target, replacement);
fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done');
