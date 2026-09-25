const fs = require('fs');
const path = require('path');

// --- 1. Modify server.js ---
let serverCode = fs.readFileSync('server.js', 'utf8');

const limitLogic = `// --- EMAIL LIMITS DB ---
const EMAIL_LIMITS_FILE = path.join(process.cwd(), 'email_limits.json');
let emailLimits = {};

function loadEmailLimits() {
  try {
    if (fs.existsSync(EMAIL_LIMITS_FILE)) {
      emailLimits = JSON.parse(fs.readFileSync(EMAIL_LIMITS_FILE, 'utf8'));
    }
  } catch (e) {
    console.error("Error loading email limits:", e);
  }
}
function saveEmailLimits() {
  fs.writeFileSync(EMAIL_LIMITS_FILE, JSON.stringify(emailLimits, null, 2));
}
loadEmailLimits();

function canGenerateEmail(email, type) {
  if (!emailLimits[email]) emailLimits[email] = { register: [], reset: [] };
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  
  // Clean up entries older than 24h
  emailLimits[email][type] = emailLimits[email][type].filter(t => now - t < twentyFourHours);
  
  return emailLimits[email][type].length < 2;
}

function recordEmailGeneration(email, type) {
  if (!emailLimits[email]) emailLimits[email] = { register: [], reset: [] };
  emailLimits[email][type].push(Date.now());
  saveEmailLimits();
}
`;

// Insert limit logic right before `// Load .env if present`
if (!serverCode.includes('loadEmailLimits')) {
  serverCode = serverCode.replace('// --- USER AUTHENTICATION DB ---', limitLogic + '\n// --- USER AUTHENTICATION DB ---');
}

// Update /api/auth/register
const targetRegisterStr = `    const existingUserIndex = users.findIndex(u => u.email === email);`;
const replacementRegisterStr = `    if (!canGenerateEmail(email, 'register')) {
      return res.status(429).json({ success: false, rateLimited: true, error: 'Registration email limit reached for this email.' });
    }

    const existingUserIndex = users.findIndex(u => u.email === email);`;
if (!serverCode.includes("canGenerateEmail(email, 'register')")) {
  serverCode = serverCode.replace(targetRegisterStr, replacementRegisterStr);
}

const targetSendVerification = `sendVerificationEmail(email, verificationCode, firstname); // non-blocking`;
const replacementSendVerification = `recordEmailGeneration(email, 'register');\n    sendVerificationEmail(email, verificationCode, firstname); // non-blocking`;
if (!serverCode.includes("recordEmailGeneration(email, 'register')")) {
  serverCode = serverCode.replace(targetSendVerification, replacementSendVerification);
}


// Update /api/auth/reset-request
const targetResetRequest = `    const { email } = req.body;
    const user = users.find(u => u.email === email && u.isVerified);`;
const replacementResetRequest = `    const { email } = req.body;
    const user = users.find(u => u.email === email && u.isVerified);
    
    if (user && !canGenerateEmail(email, 'reset')) {
      return res.status(429).json({ success: false, rateLimited: true, error: 'Reset password email limit reached for this email.' });
    }`;
if (!serverCode.includes("canGenerateEmail(email, 'reset')")) {
  serverCode = serverCode.replace(targetResetRequest, replacementResetRequest);
}

const targetResetVerification = `sendVerificationEmail(email, code, user.firstname, 'reset');`;
const replacementResetVerification = `recordEmailGeneration(email, 'reset');\n    sendVerificationEmail(email, code, user.firstname, 'reset');`;
if (!serverCode.includes("recordEmailGeneration(email, 'reset')")) {
  serverCode = serverCode.replace(targetResetVerification, replacementResetVerification);
}

fs.writeFileSync('server.js', serverCode, 'utf8');
console.log("Updated server.js");

// --- 2. Modify src/components/LoginModal.jsx ---
let loginCode = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetHandleResetReq = `      const data = await response.json();
      if (data.success) {
        setCodeDigits(['', '', '', '', '']); // Clear digits for safety`;
const replacementHandleResetReq = `      const data = await response.json();
      if (data.rateLimited) return; // Do nothing if limit reached
      if (data.success) {
        setCodeDigits(['', '', '', '', '']); // Clear digits for safety`;
if (!loginCode.includes('if (data.rateLimited) return; // Do nothing if limit reached')) {
  loginCode = loginCode.replace(targetHandleResetReq, replacementHandleResetReq);
}

const targetHandleReg = `      const data = await response.json();
      if (data.success) {
          console.log('%c[DEVELOPER FALLBACK]', 'color: #ffb366; font-size: 16px; font-weight: bold;');`;
const replacementHandleReg = `      const data = await response.json();
      if (data.rateLimited) return; // Do nothing if limit reached
      if (data.success) {
          console.log('%c[DEVELOPER FALLBACK]', 'color: #ffb366; font-size: 16px; font-weight: bold;');`;
if (!loginCode.includes('if (data.rateLimited) return; // Do nothing if limit reached')) {
  loginCode = loginCode.replace(targetHandleReg, replacementHandleReg);
}

fs.writeFileSync('src/components/LoginModal.jsx', loginCode, 'utf8');
console.log("Updated LoginModal.jsx");
