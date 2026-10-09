const fs = require('fs');
let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `{/* Share Live Update Popup */}`;

const replaceStr = `{/* Train Timetable Popup */}
        {showTimetablePopup && (
          <div className="share-update-overlay" onClick={() => setShowTimetablePopup(false)}>
            <div className="share-update-popup" onClick={e => e.stopPropagation()}>
              <div className="share-popup-header">
                <button className="share-popup-close" onClick={() => setShowTimetablePopup(false)}>
                  <X size={16} />
                </button>
                <h3 className="share-popup-title">Train Timetable</h3>
              </div>
              
              <div className="share-popup-location" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="preview-icon-box">
                    <img src="/train-icon.png" alt="train" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
                  </div>
                  <div className="preview-title-block">
                    <h4 className="share-loc-title">{selectedLocation ? selectedLocation.name : 'Railway Station'}</h4>
                    <p className="share-loc-subtitle">◈ Schedule</p>
                  </div>
                </div>
                
                <div style={{ padding: '20px', textAlign: 'center', color: isDarkMode ? '#aaa' : '#666', border: '1px dashed #ccc', borderRadius: '8px' }}>
                  <p>Timetable data will be displayed here soon.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Live Update Popup */}`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/MapPage.jsx', content, 'utf8');
console.log('Injected Train Timetable Popup');
