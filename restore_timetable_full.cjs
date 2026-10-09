const fs = require('fs');

let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add state variable
if (!content.includes('const [showTimetablePopup, setShowTimetablePopup] = React.useState(false);') && !content.includes('useState(false)')) {
  // Try to insert after showUpdatePopup or similar
  content = content.replace(
    'const [showUpdatePopup, setShowUpdatePopup] = useState(false);',
    'const [showUpdatePopup, setShowUpdatePopup] = useState(false);\n  const [showTimetablePopup, setShowTimetablePopup] = React.useState(false);'
  );
  // fallback if useState wasn't prefixed with React
  content = content.replace(
    'const [showUpdatePopup, setShowUpdatePopup] = React.useState(false);',
    'const [showUpdatePopup, setShowUpdatePopup] = React.useState(false);\n  const [showTimetablePopup, setShowTimetablePopup] = React.useState(false);'
  );
  // fallback 2
  if (!content.includes('showTimetablePopup')) {
    content = content.replace(
      'const [showRatingModal, setShowRatingModal] = React.useState(false);',
      'const [showRatingModal, setShowRatingModal] = React.useState(false);\n  const [showTimetablePopup, setShowTimetablePopup] = React.useState(false);'
    );
  }
}

// 2. Add popup UI placeholder
const popupHTML = `        {/* Train Timetable Popup */}
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
                    <p className="share-loc-subtitle">⏳ Schedule</p>
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

if (!content.includes('Train Timetable Popup')) {
  content = content.replace('{/* Share Live Update Popup */}', popupHTML);
}

// 3. Update the click handler for the Timetable button
// The old code is:
/*
                  <button className={`btn-route ${plannedStops.find(s => s.id === selectedLocation?.id) ? 'added' : ''}`} onClick={() => {
                    if (selectedLocation && selectedLocation.type !== 'train') {
                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {
*/
content = content.replace(
  /if \(selectedLocation && selectedLocation\.type !== 'train'\) \{\s*if \(!plannedStops\.find\(s => s\.id === selectedLocation\.id\)\) \{/g,
  `if (selectedLocation && selectedLocation.type === 'train') {
                      setShowTimetablePopup(true);
                    } else if (selectedLocation && selectedLocation.type !== 'train') {
                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {`
);

fs.writeFileSync('src/components/MapPage.jsx', content, 'utf8');
console.log('Restored state, popup HTML, and click handler.');
