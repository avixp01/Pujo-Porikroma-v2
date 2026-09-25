const fs = require('fs');
let code = fs.readFileSync('src/components/ChatPopup.jsx', 'utf8');

// Remove the old guest wrapper around chat-warning-message
const oldWrapperTarget = `{isGuest && (
          <div style={{ position: 'absolute', top: '120px', left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div className="bengali-text" style={{ background: '#33221c', padding: '15px 30px', borderRadius: '25px', color: '#ffb366', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ff8a00', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', zIndex: 11 }}>
              Log in করুন Chat পরিষেবার জন্য
            </div>
          </div>
        )}
        <div style={isGuest ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        <div className="chat-warning-message bengali-text">`;

const oldWrapperReplace = `<div className="chat-warning-message bengali-text">`;

if(code.includes(oldWrapperTarget)) {
    code = code.replace(oldWrapperTarget, oldWrapperReplace);
}

// Now insert the new wrapper that includes the tabs
const newWrapperTarget = `              </button>
            </div>
            
            {!activeGroupChatId && (
              <div className="chat-popup-tabs-container">`;

const newWrapperReplace = `              </button>
            </div>
          </div>
          
          {isGuest && (
            <div style={{ position: 'absolute', top: '70px', left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="bengali-text" style={{ background: '#33221c', padding: '15px 30px', borderRadius: '25px', color: '#ffb366', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ff8a00', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', zIndex: 11 }}>
                Log in করুন chat পরিষেবার জন্য
              </div>
            </div>
          )}
          <div style={isGuest ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {!activeGroupChatId && (
              <div className="chat-popup-tabs-container">`;

if(code.includes(newWrapperTarget)) {
    code = code.replace(newWrapperTarget, newWrapperReplace);
} else {
    console.log("Could not find newWrapperTarget");
}

// Fix the closing tags. Because we removed the old wrapper, the `</div>` at the bottom is now extra.
// But wait! We just MOVED the start of the wrapper UP, we didn't add a new one. The closing `</div>` at the bottom is STILL CORRECT because it now closes the new wrapper that starts above the tabs!
// Wait! I ALSO closed `<div className="chat-popup-header">` in `newWrapperReplace`!
// Let's check what I replaced:
// In original code: 
// `</div>` (closes header-top)
// `{!activeGroupChatId && ...}`
// `</div>` (closes header)
// 
// So by inserting `</div>` (to close header early) and starting `<div style={...}>`, I've preserved the nesting count!
// But wait, the original `</div>` that closed the header is still further down in the file!

// Let's find that old `</div>` that used to close `chat-popup-header` and remove it.
const oldHeaderCloseTarget = `              </div>
            )}
          </div>
          
        <div className="chat-warning-message bengali-text">`;

const oldHeaderCloseReplace = `              </div>
            )}
            
        <div className="chat-warning-message bengali-text">`;

if(code.includes(oldHeaderCloseTarget)) {
    code = code.replace(oldHeaderCloseTarget, oldHeaderCloseReplace);
} else {
    console.log("Could not find oldHeaderCloseTarget");
}

fs.writeFileSync('src/components/ChatPopup.jsx', code, 'utf8');
console.log('Updated ChatPopup to blur tabs as well.');
