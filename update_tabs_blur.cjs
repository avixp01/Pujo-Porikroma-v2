const fs = require('fs');
let code = fs.readFileSync('src/components/ChatPopup.jsx', 'utf8');

// 1. We want to close the header early, add the guest overlay, and start the blur wrapper.
const target1 = `              </button>
            </div>
            
            {!activeGroupChatId && (
              <div className="chat-popup-tabs-container">`;

const replacement1 = `              </button>
            </div>
          </div>
          
          {isGuest && (
            <div style={{ position: 'absolute', top: '70px', left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="bengali-text" style={{ background: '#33221c', padding: '15px 30px', borderRadius: '25px', color: '#ffb366', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ff8a00', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', zIndex: 11 }}>
                Log in করুন Chat পরিষেবার জন্য
              </div>
            </div>
          )}
          
          <div style={isGuest ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {!activeGroupChatId && (
              <div className="chat-popup-tabs-container">`;

if (code.includes(target1)) {
  code = code.replace(target1, replacement1);
} else {
  console.log("Could not find target1");
}

// 2. We need to remove the `</div>` that previously closed `chat-popup-header`.
const target2 = `              </div>
              </div>
            )}
          </div>
          
          <div className="chat-warning-message bengali-text">`;

const replacement2 = `              </div>
              </div>
            )}
          
          <div className="chat-warning-message bengali-text">`;

if (code.includes(target2)) {
  code = code.replace(target2, replacement2);
} else {
  console.log("Could not find target2");
}

// 3. Since we added a new `<div style={...}>` wrapper, we need to make sure there's an extra `</div>` at the bottom.
const target3 = `      </div>
    </div>
  );
};`;
const replacement3 = `      </div>
      </div>
    </div>
  );
};`;
if (code.includes(target3)) {
  code = code.replace(target3, replacement3);
} else {
  console.log("Could not find target3");
}

fs.writeFileSync('src/components/ChatPopup.jsx', code, 'utf8');
console.log('Fixed tabs blur.');
