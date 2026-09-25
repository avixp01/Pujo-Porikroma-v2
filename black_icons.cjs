const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetCompass = `<svg 
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ transform: \`rotate(\${-bearing}deg)\`, transition: 'transform 0.1s ease-out' }}
          >
            <circle cx="12" cy="12" r="9" stroke="#4285F4" strokeWidth="2"/>
            <path d="M12 5 L14.5 12 L9.5 12 Z" fill="#EA4335"/>
            <path d="M12 19 L14.5 12 L9.5 12 Z" fill="#4285F4"/>
          </svg>`;

const replacementCompass = `<svg 
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ transform: \`rotate(\${-bearing}deg)\`, transition: 'transform 0.1s ease-out' }}
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 5 L14.5 12 L9.5 12 Z" fill="currentColor"/>
            <path d="M12 19 L14.5 12 L9.5 12 Z" fill="currentColor"/>
          </svg>`;

const targetLocate = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2"/>
            <circle cx="12" cy="12" r="2" fill={isFollowing ? "#1a73e8" : "#4285F4"}/>
            <path d="M12 2 v3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 22 v-3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12 h3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 12 h-3" stroke={isFollowing ? "#1a73e8" : "#4285F4"} strokeWidth="2" strokeLinecap="round"/>
          </svg>`;

const replacementLocate = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <path d="M12 2 v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 22 v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12 h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 12 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>`;

if (code.includes(targetCompass) && code.includes(targetLocate)) {
    code = code.replace(targetCompass, replacementCompass);
    code = code.replace(targetLocate, replacementLocate);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced both SVGs");
} else {
    console.log("Target strings not found");
}
