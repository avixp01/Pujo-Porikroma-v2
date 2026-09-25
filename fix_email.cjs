const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// 1. Fix the function signature and content
const oldFunc = `async function sendVerificationEmail(email, code, name) {`;
const newFunc = `async function sendVerificationEmail(email, code, name, type = 'register') {`;

const oldSubject = `subject: \`Your Pujo Porikroma Verification Code: \${code}\`,`;
const newSubject = `subject: type === 'reset' ? \`Your Pujo Porikroma Password Reset Code: \${code}\` : \`Your Pujo Porikroma Verification Code: \${code}\`,`;

const oldTextMsg = `text: \`Hello \${name}, your Pujo Porikroma verification code is: \${code}. Please do not share this code with anyone.\`,`;
const newTextMsg = `text: type === 'reset' ? \`Hello \${name}, your Pujo Porikroma password reset code is: \${code}. Please do not share this code with anyone.\` : \`Hello \${name}, your Pujo Porikroma verification code is: \${code}. Please do not share this code with anyone.\`,`;

const oldHtmlMsg = `<p style="font-size: 16px; color: #d9c3b8; margin-bottom: 30px;">Hello \${name}, please verify your email address to complete your registration.</p>`;
const newHtmlMsg = `<p style="font-size: 16px; color: #d9c3b8; margin-bottom: 30px;">
              Hello \${name}, \${type === 'reset' ? 'Please verify your unique code to complete your password reset process.' : 'please verify your email address to complete your registration.'}
            </p>`;

// 2. Fix the caller in reset-request
const oldCaller = `sendVerificationEmail(email, user.firstname, code);`;
const newCaller = `sendVerificationEmail(email, code, user.firstname, 'reset');`;

if (code.includes(oldFunc)) code = code.replace(oldFunc, newFunc);
if (code.includes(oldSubject)) code = code.replace(oldSubject, newSubject);
if (code.includes(oldTextMsg)) code = code.replace(oldTextMsg, newTextMsg);
if (code.includes(oldHtmlMsg)) code = code.replace(oldHtmlMsg, newHtmlMsg);
if (code.includes(oldCaller)) code = code.replace(oldCaller, newCaller);

fs.writeFileSync('server.js', code, 'utf8');
console.log('Fixed email bugs!');
