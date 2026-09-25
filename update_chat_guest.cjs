const fs = require('fs');
let code = fs.readFileSync('src/components/ChatPopup.jsx', 'utf8');

// 1. Add isGuest
const initTarget = `const [invites, setInvites] = useState([]);`;
const initReplace = `const [invites, setInvites] = useState([]);
  const isGuest = !localStorage.getItem('pujoUser');`;
code = code.replace(initTarget, initReplace);

// 2. Wrap the content below the header
const wrapStartTarget = `        </div>

        <div className="chat-warning-message bengali-text">`;
const wrapStartReplace = `        </div>
        
        {isGuest && (
          <div style={{ position: 'absolute', top: '120px', left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div className="bengali-text" style={{ background: '#33221c', padding: '15px 30px', borderRadius: '25px', color: '#ffb366', fontWeight: 'bold', fontSize: '18px', border: '1px solid #ff8a00', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', zIndex: 11 }}>
              Log in করুন Chat পরিষেবার জন্য
            </div>
          </div>
        )}
        <div style={isGuest ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        <div className="chat-warning-message bengali-text">`;
if(code.includes(wrapStartTarget)){
    code = code.replace(wrapStartTarget, wrapStartReplace);
}

// 3. Close the wrapper div right before chat-popup-container closes
const wrapEndTarget = `      </div>
    </div>
  );
};`;
const wrapEndReplace = `      </div>
      </div>
    </div>
  );
};`;
if(code.includes(wrapEndTarget)){
    code = code.replace(wrapEndTarget, wrapEndReplace);
}

fs.writeFileSync('src/components/ChatPopup.jsx', code, 'utf8');
console.log('Updated ChatPopup with guest restrictions.');
