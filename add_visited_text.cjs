const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `          <div className="preview-metro-info">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
              <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
            </svg>
            <span className="metro-name">Jatin Das Park</span>   exit <span className="metro-gate">Gate 3</span>   2.4 km walk
          </div>`;

const replaceStr = `          <div className="preview-metro-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
                <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
              </svg>
              <span><span className="metro-name">Jatin Das Park</span>   exit <span className="metro-gate">Gate 3</span>   2.4 km walk</span>
            </div>
            <span style={{ color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>Visited?</span>
          </div>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully added Visited? text");
} else {
    console.log("Could not find the target string. Let me try a regex.");
    const regex = /<div className="preview-metro-info">[\s\S]*?2\.4 km walk\s*<\/div>/;
    if (regex.test(content)) {
        content = content.replace(regex, replaceStr);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Successfully added Visited? text using regex");
    } else {
        console.log("Regex also failed.");
    }
}
