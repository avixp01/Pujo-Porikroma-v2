const fs = require('fs');
let code = fs.readFileSync('src/components/ChatPopup.jsx', 'utf8');

const regex1 = /(\s*)\{\!activeGroupChatId\s*&&\s*\(\s*<div\s+className="chat-popup-tabs-container">/;
const replace1 = `$1</div>
          
          {isGuest && (
            <div style={{ position: 'absolute', top: '70px', left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="bengali-text" style={{ background: '#33221c', padding: '15px 30px', borderRadius: '25px', color: '#ffb366', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ff8a00', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', zIndex: 11 }}>
                Log in করুন Chat পরিষেবার জন্য
              </div>
            </div>
          )}
          
          <div style={isGuest ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>$1{!activeGroupChatId && (
              <div className="chat-popup-tabs-container">`;

code = code.replace(regex1, replace1);

const regex2 = /(\s*)<\/div>\s*<div className="chat-warning-message bengali-text">/;
const replace2 = `$1<div className="chat-warning-message bengali-text">`;

code = code.replace(regex2, replace2);

fs.writeFileSync('src/components/ChatPopup.jsx', code, 'utf8');
console.log('Fixed tabs blur using regex.');
