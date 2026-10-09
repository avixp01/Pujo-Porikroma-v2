const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

// 1. Inject state and logic
const targetState = /const \[visitedPandals, setVisitedPandals\] = useState\(\[\]\);/;
const stateReplacement = `const [visitedPandals, setVisitedPandals] = useState([]);
  const [liveUpdateMsg, setLiveUpdateMsg] = useState('');

  React.useEffect(() => {
    let expiry = localStorage.getItem('ghasBaganTestExpiry');
    if (!expiry || Date.now() > parseInt(expiry)) {
      localStorage.setItem('ghasBaganTestExpiry', (Date.now() + 10 * 60 * 1000).toString());
    }
  }, []);

  const getMajorityUpdate = (pandalName) => {
    try {
      const stored = localStorage.getItem('liveUpdates');
      if (!stored) return null;
      const allUpdates = JSON.parse(stored);
      const pandalUpdates = allUpdates[pandalName] || [];
      const validUpdates = pandalUpdates.filter(u => Date.now() - u.timestamp < 30 * 60 * 1000);
      if (validUpdates.length === 0) return null;
      
      const rainCounts = {};
      const crowdCounts = {};
      validUpdates.forEach(u => {
        rainCounts[u.rain] = (rainCounts[u.rain] || 0) + 1;
        crowdCounts[u.crowd] = (crowdCounts[u.crowd] || 0) + 1;
      });
      
      const majorityRain = Object.keys(rainCounts).reduce((a, b) => rainCounts[a] > rainCounts[b] ? a : b);
      const majorityCrowd = Object.keys(crowdCounts).reduce((a, b) => crowdCounts[a] > crowdCounts[b] ? a : b);
      
      return { rain: majorityRain, crowd: parseInt(majorityCrowd) };
    } catch (e) {
      return null;
    }
  };
`;
content = content.replace(targetState, stateReplacement);

// 2. Replace the static preview-status-cards
const targetPreview = /<div className="preview-status-row">[\s\S]*?<div className="preview-update-card">/;
const previewReplacement = `<div className="preview-status-row">
            {(() => {
              const liveStatus = selectedLocation ? getMajorityUpdate(selectedLocation.name) : null;
              
              const rainText = liveStatus ? 
                (liveStatus.rain === 'no_rain' ? 'No rain' : 
                 liveStatus.rain === 'drizzle' ? 'Drizzle' : 
                 liveStatus.rain === 'raining' ? 'Raining' : 'Heavy rain') 
                : '...';
              const rainColor = liveStatus ? 
                (liveStatus.rain === 'no_rain' ? '#cc5550' : 
                 liveStatus.rain === 'drizzle' ? '#2563eb' : 
                 liveStatus.rain === 'raining' ? '#b91c1c' : '#374151') 
                : '#6b7280';
                
              const crowdText = liveStatus ? \`\${liveStatus.crowd}/10\` : '...';
              const crowdDesc = liveStatus ? 
                (liveStatus.crowd <= 3 ? 'Easy entry' : 
                 liveStatus.crowd <= 6 ? 'Moderate' : 
                 liveStatus.crowd <= 8 ? 'Busy' : 'Very crowded') 
                : 'Waiting for an update';
              const crowdColor = liveStatus ? 
                (liveStatus.crowd <= 3 ? '#16a34a' : 
                 liveStatus.crowd <= 6 ? '#b45309' : 
                 liveStatus.crowd <= 8 ? '#b91c1c' : '#991b1b') 
                : '#6b7280';

              return (
                <>
                  <div className="preview-status-card rain">
                    <div className="status-card-header">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg> Rain status
                    </div>
                    <div className="status-card-value" style={{ color: rainColor, fontWeight: liveStatus ? 'bold' : 'normal' }}>{rainText}</div>
                    <div className="status-card-desc">{liveStatus ? 'Recent update' : 'No recent reports'}</div>
                  </div>
                  <div className="preview-status-card crowd">
                    <div className="status-card-header">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Crowd level
                    </div>
                    <div className="status-card-value" style={{ color: crowdColor, fontWeight: liveStatus ? 'bold' : 'normal' }}>{crowdText}</div>
                    <div className="status-card-desc" style={{ color: crowdColor }}>{crowdDesc}</div>
                  </div>
                </>
              );
            })()}
            </div>
  
            <div className="preview-update-card">`;
content = content.replace(targetPreview, previewReplacement);

// 3. Replace the submit button
const targetButton = /<div className="share-popup-footer">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\)\}/;
const buttonReplacement = `<div className="share-popup-footer">
                  <div className="share-warning">? Move closer to the pandal or mark a recent visit to update.</div>
                  <button 
                    className="share-submit-btn" 
                    onClick={() => {
                      if (!userLocation) {
                        setLiveUpdateMsg("Location required!");
                        setTimeout(() => setLiveUpdateMsg(''), 3000);
                        return;
                      }
                      
                      const isTestMode = selectedLocation?.name === 'Ghas Bagan' && Date.now() < (parseInt(localStorage.getItem('ghasBaganTestExpiry')) || 0);
                      const dist = getDistance(userLocation[0], userLocation[1], selectedLocation.lat, selectedLocation.lng);
                      
                      if (!isTestMode && dist > 0.05) {
                        setLiveUpdateMsg("You are too far away from this pandal");
                        setTimeout(() => setLiveUpdateMsg(''), 3000);
                        return;
                      }
                      
                      try {
                        const stored = localStorage.getItem('liveUpdates');
                        const allUpdates = stored ? JSON.parse(stored) : {};
                        if (!allUpdates[selectedLocation.name]) allUpdates[selectedLocation.name] = [];
                        allUpdates[selectedLocation.name].push({
                          timestamp: Date.now(),
                          rain: rainStatus,
                          crowd: crowdLevel
                        });
                        localStorage.setItem('liveUpdates', JSON.stringify(allUpdates));
                        setShowUpdatePopup(false);
                      } catch (e) {}
                    }}
                    style={{
                      background: userLocation ? '#4a3022' : '#e5e7eb',
                      color: userLocation ? '#d97706' : '#9ca3af',
                      cursor: userLocation ? 'pointer' : 'not-allowed',
                      opacity: 1
                    }}
                  >
                    ? Submit update
                  </button>
                  {liveUpdateMsg && (
                    <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', zIndex: 100, whiteSpace: 'nowrap' }}>
                      {liveUpdateMsg}
                    </div>
                  )}
                  <button className="share-not-now-btn" onClick={() => setShowUpdatePopup(false)}>Not now</button>
                </div>
              </div>
            </div>
          )}`;
content = content.replace(targetButton, buttonReplacement);

fs.writeFileSync(file, content);
console.log("Successfully implemented live updates logic!");

