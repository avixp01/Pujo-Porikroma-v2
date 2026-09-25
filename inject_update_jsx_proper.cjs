const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const popupJSX = `
        {/* Share Live Update Popup */}
        {showUpdatePopup && (
          <div className="share-update-overlay" onClick={() => setShowUpdatePopup(false)}>
            <div className="share-update-popup" onClick={e => e.stopPropagation()}>
              <div className="share-popup-header">
                <button className="share-popup-close" onClick={() => setShowUpdatePopup(false)}>
                  <X size={16} />
                </button>
                <h3 className="share-popup-title">Share live update</h3>
              </div>
              
              <div className="share-popup-location">
                <div className="preview-icon-box">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#cc5550">
                    <path d="M12 4 L14 8 H10 Z" />
                  </svg>
                </div>
                <div className="preview-title-block">
                  <h4 className="share-loc-title">{selectedLocation ? selectedLocation.name : 'Unknown Location'}</h4>
                  <p className="share-loc-subtitle">◈ {selectedLocation?.address || 'Ballygunge Place, Ballygunge'}</p>
                </div>
              </div>
              
              <p className="share-popup-desc">
                Your update helps other pujo lovers. Valid for 30 minutes.
              </p>
              
              <div className="share-section">
                <h4 className="share-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg> 
                  Rain status
                </h4>
                <div className="rain-options">
                  <button className={\`rain-btn \${rainStatus === 'no_rain' ? 'active' : ''}\`} onClick={() => setRainStatus('no_rain')}>
                    <Sun size={24} color={rainStatus === 'no_rain' ? '#cc5550' : '#6b7280'} />
                    <span>No rain</span>
                  </button>
                  <button className={\`rain-btn \${rainStatus === 'drizzle' ? 'active' : ''}\`} onClick={() => setRainStatus('drizzle')}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke={rainStatus === 'drizzle' ? '#2563eb' : '#6b7280'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 16v6"></path><path d="M16 16v6"></path></svg>
                    <span>Drizzle</span>
                  </button>
                  <button className={\`rain-btn \${rainStatus === 'raining' ? 'active' : ''}\`} onClick={() => setRainStatus('raining')}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke={rainStatus === 'raining' ? '#b91c1c' : '#6b7280'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 14v6"></path><path d="M12 16v6"></path><path d="M16 14v6"></path></svg>
                    <span>Raining</span>
                  </button>
                  <button className={\`rain-btn \${rainStatus === 'heavy' ? 'active' : ''}\`} onClick={() => setRainStatus('heavy')}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke={rainStatus === 'heavy' ? '#374151' : '#6b7280'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path><path d="M20 14v6"></path></svg>
                    <span>Heavy rain</span>
                  </button>
                </div>
              </div>
              
              <div className="share-section">
                <h4 className="share-section-title">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Crowd level
                </h4>
                
                <div className="crowd-display">
                  <div className="crowd-score" style={{ color: crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b' }}>
                    {crowdLevel}/10
                  </div>
                  <div className="crowd-text-container">
                    <div className="crowd-status" style={{ color: crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b' }}>
                      {crowdLevel <= 3 ? 'Easy entry' : crowdLevel <= 6 ? 'Moderate' : crowdLevel <= 8 ? 'Busy' : 'Very crowded'}
                    </div>
                    <div className="crowd-subtext">
                      {crowdLevel <= 3 ? 'Little or no queue right now.' : crowdLevel <= 6 ? 'A short queue, moving steadily.' : crowdLevel <= 8 ? 'Expect a wait, but it\\'s moving.' : 'Long queue and a slower entry.'}
                    </div>
                  </div>
                </div>
                
                <div className="crowd-slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={crowdLevel} 
                    onChange={(e) => setCrowdLevel(parseInt(e.target.value))} 
                    className="crowd-slider" 
                    style={{
                      background: \`linear-gradient(to right, \${crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b'} 0%, \${crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b'} \${(crowdLevel - 1) * 11.1}%, #e5e7eb \${(crowdLevel - 1) * 11.1}%, #e5e7eb 100%)\`,
                      color: crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b'
                    }}
                  />
                  <div className="slider-labels">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                  </div>
                </div>
              </div>
              
              <div className="share-popup-footer">
                <div className="share-warning">◈ Move closer to the pandal or mark a recent visit to update.</div>
                <button className="share-submit-btn" disabled>➤ Submit update</button>
                <button className="share-not-now-btn" onClick={() => setShowUpdatePopup(false)}>Not now</button>
              </div>
            </div>
          </div>
        )}
`;

code = code.replace(/<\/div>\s*< \/div>\s*\);\s*\};\s*export default MapPage;/g, ''); // Wait, the regex needs to be precise.

const replacementTarget = `      </div>\n  );\n};\n\nexport default MapPage;`;
if (code.includes(replacementTarget)) {
  code = code.replace(replacementTarget, popupJSX + `\n      </div>\n  );\n};\n\nexport default MapPage;`);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log("Successfully injected JSX using exact string replacement!");
} else {
  // Try regex if exact match fails
  const regex = /<\/div>\s*\);\s*\};\s*export default MapPage;/;
  if (regex.test(code)) {
    code = code.replace(regex, popupJSX + `\n      </div>\n  );\n};\n\nexport default MapPage;`);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully injected JSX using regex!");
  } else {
    console.log("Failed to find end of MapPage.jsx");
  }
}
