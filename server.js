import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { checkPandalDuplicate } from './src/data/pandals.js';

// Load .env if present
if (fs.existsSync('.env') && process.loadEnvFile) {
  try {
    process.loadEnvFile('.env');
  } catch (e) {
    console.error("Error loading .env file:", e.message);
  }
}

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

let onlineUsers = 0;
let userCounter = 0;
let messages = [];
let groups = [];

// Helper to calculate the current 3-hour block index
function getCurrentTimeBlock() {
  const currentHour = new Date().getHours();
  // 3-hour blocks: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00
  return Math.floor(currentHour / 3);
}

let currentBlock = getCurrentTimeBlock();
let lastHourReported = new Date().getHours();

function getBengaliHourString(date) {
  const hours = date.getHours();
  let timePrefix = '';
  if (hours >= 5 && hours < 12) {
    timePrefix = 'সকাল';
  } else if (hours >= 12 && hours < 16) {
    timePrefix = 'দুপুর';
  } else if (hours >= 16 && hours < 18) {
    timePrefix = 'বিকেল';
  } else if (hours >= 18 && hours < 21) {
    timePrefix = 'সন্ধ্যা';
  } else if (hours >= 21 && hours < 24) {
    timePrefix = 'রাত';
  } else if (hours >= 0 && hours < 3) {
    timePrefix = 'মধ্যরাত';
  } else if (hours >= 3 && hours < 5) {
    timePrefix = 'ভোর';
  }
  
  let displayHours = hours % 12;
  displayHours = displayHours ? displayHours : 12;
  
  const bengaliNumbers = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  
  const strHours = String(displayHours).split('').map(d => bengaliNumbers[d]).join('');
  return `${strHours}:০০ ${timePrefix}`;
}



// Add the initial hourly reminder immediately upon server startup
messages.push({
  id: Date.now() + Math.random().toString(36).substr(2, 9),
  isSystemMessage: true,
  text: getBengaliHourString(new Date()),
  timestamp: new Date().toISOString()
});

// Check every minute if the 3-hour block or hour has changed
setInterval(() => {
  const now = new Date();
  
  // 1. Check for 3-hour boundary (clear chat)
  const newBlock = getCurrentTimeBlock();
  if (newBlock !== currentBlock) {
    currentBlock = newBlock;
    messages = []; // Clear chat history
    
    // Instantly add the current hour's reminder to the clean chat
    const initialTimeMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      isSystemMessage: true,
      text: getBengaliHourString(now),
      timestamp: now.toISOString()
    };
    messages.push(initialTimeMessage);
    
    io.emit('chatCleared'); // Notify all clients
    console.log(`[System] 3-hour boundary crossed. Cleared chat history.`);
  }

  // 2. Check for hour boundary (add time reminder)
  if (now.getHours() !== lastHourReported) {
    lastHourReported = now.getHours();
    
    const timeMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      isSystemMessage: true,
      text: getBengaliHourString(now),
      timestamp: now.toISOString()
    };
    messages.push(timeMessage);
    io.emit('newMessage', timeMessage);
  }
}, 60000);

let idleTimeout = null;

io.on('connection', (socket) => {
  onlineUsers++;
  userCounter++;
  
  // Assign a sequential ID and avatar (1 to 7)
  const myUserId = userCounter;
  const myAvatar = `/user logo${((myUserId - 1) % 7) + 1}.png`;
  const myUsername = `User ${myUserId}`;
  
  console.log(`User connected: ${myUsername}. Total online: ${onlineUsers}`);
  
  // Send the initial state to the newly connected user
  socket.emit('initChat', {
    myUserId,
    myUsername,
    myAvatar,
    messages
  });

  // Handle explicit requests for initChat (e.g., when ChatPopup mounts after connection)
  socket.on('requestInitChat', () => {
    socket.emit('initChat', {
      myUserId,
      myUsername,
      myAvatar,
      messages
    });
    socket.emit('initGroups', groups);
  });
  
  // Handle creating a new group
  socket.on('createGroup', (groupName) => {
    if (!groupName || typeof groupName !== 'string') return;
    
    // Enforce max 3 groups per user
    const userGroupCount = groups.filter(g => g.creatorId === myUserId).length;
    if (userGroupCount >= 3) {
      socket.emit('chatError', 'You can only create up to 3 groups at a time.');
      return;
    }

    const shortCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    const newGroup = {
      id: shortCode,
      name: groupName.trim(),
      creatorId: myUserId,
      creatorName: myUsername,
      creatorAvatar: myAvatar,
      members: [myUserId],
      membersCount: 1, // Start with 1 (the creator)
      messages: [],
      timestamp: new Date().toISOString()
    };
    groups.push(newGroup);
    io.emit('newGroup', newGroup);
  });
  
  // Handle joining a group via code
  socket.on('joinGroup', (code) => {
    if (!code || typeof code !== 'string') return;
    
    // Check if group exists
    const group = groups.find(g => g.id === code.toUpperCase());
    if (!group) {
      socket.emit('chatError', 'Group not found with this code.');
      return;
    }

    // Check if already a member
    if (group.members.includes(myUserId)) {
      socket.emit('chatError', 'You are already in this group.');
      return;
    }

    // Check max joined groups limit
    const joinedGroupsCount = groups.filter(g => g.creatorId !== myUserId && g.members.includes(myUserId)).length;
    if (joinedGroupsCount >= 3) {
      socket.emit('chatError', 'You can only join up to 3 groups created by others.');
      return;
    }

    // Check max members per group (the UI says "holds up to 3 members")
    if (group.members.length >= 3) {
      socket.emit('chatError', 'This group is already full (max 3 members).');
      return;
    }

    // Join the group
    group.members.push(myUserId);
    group.membersCount = group.members.length;
    
    io.emit('groupUpdated', group);
  });

  // Handle deleting a group
  socket.on('deleteGroup', (groupId) => {
    const groupIndex = groups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;
    if (groups[groupIndex].creatorId !== myUserId) return; // Only creator can delete
    
    groups.splice(groupIndex, 1);
    io.emit('groupDeleted', groupId);
  });

  // Handle leaving a group
  socket.on('leaveGroup', (groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    const memberIndex = group.members.indexOf(myUserId);
    if (memberIndex === -1) return;
    
    group.members.splice(memberIndex, 1);
    group.membersCount = group.members.length;
    io.emit('groupUpdated', group);
  });

  // Handle kicking a user from a group
  socket.on('kickUser', ({ targetUserId, groupId }) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    // Only creator can kick
    if (group.creatorId !== myUserId) return;
    // Cannot kick yourself this way
    if (targetUserId === myUserId) return;

    const memberIndex = group.members.indexOf(targetUserId);
    if (memberIndex === -1) return;
    
    group.members.splice(memberIndex, 1);
    group.membersCount = group.members.length;
    io.emit('groupUpdated', group);
  });

  // Handle sending a message in a group
  socket.on('sendGroupMessage', ({ groupId, text }) => {
    if (!text || typeof text !== 'string') return;
    
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    // Verify membership
    if (!group.members.includes(myUserId)) return;

    const newMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      userId: myUserId,
      username: myUsername,
      avatar: myAvatar,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      isSystemMessage: false
    };

    if (!group.messages) group.messages = [];
    group.messages.push(newMessage);
    
    io.emit('newGroupMessage', { groupId, message: newMessage });
  });

  socket.on('sendGroupInvite', ({ targetUserId, groupId }) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    // Send the invite directly to everyone, but clients will filter by targetUserId
    // In a real app, this should only emit to the specific targetUserId's socket room
    io.emit('receiveGroupInvite', {
      targetUserId,
      groupId: group.id,
      groupName: group.name,
      fromUserName: myUsername,
      timestamp: new Date().toISOString()
    });
  });

  // Broadcast the new online count
  io.emit('onlineUsersUpdate', onlineUsers);

  // Handle incoming messages
  socket.on('sendMessage', (text) => {
    if (!text || typeof text !== 'string') return;
    
    // Validate 50 words limit
    const words = text.trim().split(/\s+/);
    if (words.length > 50) {
      socket.emit('chatError', 'Message exceeds 50 words.');
      return;
    }

    const newMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      userId: myUserId,
      username: myUsername,
      avatar: myAvatar,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);
    io.emit('newMessage', newMessage);
    
    // Set exactly 5-minute relative timeout for inactivity
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      const reminder = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        isSystemMessage: true,
        isTimeReminder: true,
        text: "৫ মিনিট আগে",
        timestamp: new Date().toISOString()
      };
      messages.push(reminder);
      io.emit('newMessage', reminder);
    }, 5 * 60 * 1000);
  });

  socket.on('disconnect', () => {
    onlineUsers--;
    console.log(`${myUsername} disconnected. Total online: ${onlineUsers}`);
    io.emit('onlineUsersUpdate', onlineUsers);
  });
});

// ==========================================
// REPORT A PROBLEM & RATE LIMITING BACKEND
// ==========================================
const REPORT_MAX_PER_WINDOW = 10;
const REPORT_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 hours
let reportEmailTimestamps = [];
const REPORTS_FILE = path.resolve('reports.json');

function loadReports() {
  try {
    if (fs.existsSync(REPORTS_FILE)) {
      return JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error("Error reading reports file:", e);
  }
  return [];
}

function saveReport(report) {
  try {
    const list = loadReports();
    list.push(report);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving report to file:", e);
  }
}

// Nodemailer transporter setup
let mailTransporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function forwardReportEmail(report) {
  const { topic, description, contact, timestamp } = report;
  const targetEmail = 'saikatsom234@gmail.com';

  console.log(`[REPORT SUBMISSION] Dispatching real email to ${targetEmail}`);
  console.log(`  Topic: ${topic}`);
  console.log(`  Contact: ${contact}`);
  console.log(`  Description: ${description}`);
  console.log(`  Time: ${timestamp}`);

  // 1. Direct Gmail / SMTP delivery if credentials provided in environment
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `"Pujo Porikroma Reports" <${smtpUser}>`,
        to: targetEmail,
        replyTo: contact.includes('@') ? contact : undefined,
        subject: `[Pujo Porikroma Problem Report] ${topic} - ${contact}`,
        text: `New Problem Report Received:\n\nTopic: ${topic}\nContact: ${contact}\nTime: ${timestamp}\n\nDescription:\n${description}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #181210; color: #f5e6d3; padding: 24px; border-radius: 12px; max-width: 600px;">
            <h2 style="color: #ffaa44; margin-top: 0;">Pujo Porikroma - New Problem Report</h2>
            <p><strong>Topic:</strong> <span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 6px;">${topic}</span></p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Submitted At:</strong> ${timestamp}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.2); margin: 16px 0;" />
            <h3 style="color: #ffffff;">Description:</h3>
            <div style="background: #241c19; padding: 16px; border-radius: 8px; white-space: pre-wrap; color: #ffffff;">${description}</div>
          </div>
        `
      });
      console.log(`[REPORT EMAIL] Successfully dispatched via Gmail SMTP to ${targetEmail}`);
      return { success: true, service: 'smtp' };
    } catch (smtpErr) {
      console.error("[REPORT EMAIL] SMTP error, falling back to transactional email service:", smtpErr.message);
    }
  }

  // 2. Transactional email gateway connected directly to saikatsom234@gmail.com
  const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'http://localhost:5173',
      'Referer': 'http://localhost:5173/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      name: "Pujo Porikroma User",
      topic: topic,
      contact: contact,
      description: description,
      message: `[Topic: ${topic}]\nContact: ${contact}\nTime: ${timestamp}\n\nDescription:\n${description}`,
      _subject: `[Pujo Porikroma Problem Report] ${topic} (${contact})`,
      _replyto: contact.includes('@') ? contact : undefined,
      _captcha: "false",
      _template: "table"
    })
  });

  const resData = await response.json();
  console.log(`[REPORT EMAIL] Transactional email service response:`, resData);

  if (!response.ok) {
    throw new Error(resData.message || 'Email transactional service returned an error');
  }

  return { success: true, service: 'formsubmit', details: resData };
}

app.post('/api/report', async (req, res) => {
  try {
    const { topic, description, contact } = req.body;

    // Validate inputs
    if (!topic || !description || !description.trim() || !contact || !contact.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Topic, description, and contact info are all required.' 
      });
    }

    const now = Date.now();
    const windowStart = now - REPORT_WINDOW_MS;

    // Purge timestamps older than 4 hours
    reportEmailTimestamps = reportEmailTimestamps.filter(ts => ts > windowStart);

    // Rate limit check: max 10 emails per 4-hour window
    if (reportEmailTimestamps.length >= REPORT_MAX_PER_WINDOW) {
      const oldestInWindow = reportEmailTimestamps[0];
      const remainingMs = (oldestInWindow + REPORT_WINDOW_MS) - now;
      const remainingMinutes = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));
      
      console.warn(`[REPORT RATE LIMIT] 10 reports reached in 4h window. Blocked until ${remainingMinutes}m.`);
      return res.status(429).json({
        success: false,
        rateLimited: true,
        error: `Rate limit reached. A maximum of 10 report emails can be sent per 4-hour window. Please try again in ${remainingMinutes} minutes.`
      });
    }

    const reportData = {
      id: Date.now() + Math.random().toString(36).substr(2, 7),
      topic: topic.trim(),
      description: description.trim(),
      contact: contact.trim(),
      timestamp: new Date().toISOString()
    };

    // Forward email via transactional email service (throws if delivery fails)
    await forwardReportEmail(reportData);

    // Register timestamp for rate limiting ONLY after successful email trigger
    reportEmailTimestamps.push(now);

    // Save to persistent storage
    saveReport(reportData);

    return res.status(200).json({
      success: true,
      message: 'Report sent successfully! We will review it shortly.'
    });
  } catch (err) {
    console.error('Error processing report:', err);
    return res.status(502).json({ 
      success: false, 
      error: err.message || 'Failed to deliver report email. Please check your internet connection and try again.' 
    });
  }
});

// ==========================================
// CONTACT US & RATE LIMITING BACKEND
// ==========================================
const CONTACT_MAX_PER_WINDOW = 10;
const CONTACT_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 hours
let contactEmailTimestamps = [];
const CONTACTS_FILE = path.resolve('contacts.json');

function loadContacts() {
  try {
    if (fs.existsSync(CONTACTS_FILE)) {
      return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error("Error reading contacts file:", e);
  }
  return [];
}

function saveContact(contactItem) {
  try {
    const list = loadContacts();
    list.push(contactItem);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving contact message to file:", e);
  }
}

async function forwardContactEmail(contactData) {
  const { name, contact, message, timestamp } = contactData;
  const targetEmail = 'saikatsom234@gmail.com';
  const senderDisplayName = name || 'User';

  console.log(`[CONTACT SUBMISSION] Dispatching real email to ${targetEmail}`);
  console.log(`  Name: ${senderDisplayName}`);
  console.log(`  Contact: ${contact}`);
  console.log(`  Message: ${message}`);
  console.log(`  Time: ${timestamp}`);

  // 1. Direct Gmail / SMTP delivery if credentials provided in environment
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `"Pujo Porikroma Help & Support" <${smtpUser}>`,
        to: targetEmail,
        replyTo: contact.includes('@') ? contact : undefined,
        subject: `[Pujo Porikroma Help & Support] ${senderDisplayName} (${contact})`,
        text: `New Help & Support Message Received:\n\nFrom: ${senderDisplayName}\nContact: ${contact}\nTime: ${timestamp}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #181210; color: #f5e6d3; padding: 24px; border-radius: 12px; max-width: 600px;">
            <h2 style="color: #ffaa44; margin-top: 0;">Pujo Porikroma - Help &amp; Support Contact</h2>
            <p><strong>Name:</strong> ${senderDisplayName}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Submitted At:</strong> ${timestamp}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.2); margin: 16px 0;" />
            <h3 style="color: #ffffff;">Message:</h3>
            <div style="background: #241c19; padding: 16px; border-radius: 8px; white-space: pre-wrap; color: #ffffff;">${message}</div>
          </div>
        `
      });
      console.log(`[CONTACT EMAIL] Successfully dispatched via Gmail SMTP to ${targetEmail}`);
      return { success: true, service: 'smtp' };
    } catch (smtpErr) {
      console.error("[CONTACT EMAIL] SMTP error, falling back to transactional email service:", smtpErr.message);
    }
  }

  // 2. Transactional email gateway connected directly to saikatsom234@gmail.com
  const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'http://localhost:5173',
      'Referer': 'http://localhost:5173/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      name: senderDisplayName,
      contact: contact,
      message: `[From: ${senderDisplayName}]\nContact: ${contact}\nTime: ${timestamp}\n\nMessage:\n${message}`,
      _subject: `[Pujo Porikroma Help & Support] ${senderDisplayName} (${contact})`,
      _replyto: contact.includes('@') ? contact : undefined,
      _captcha: "false",
      _template: "table"
    })
  });

  const resData = await response.json();
  console.log(`[CONTACT EMAIL] Transactional email service response:`, resData);

  if (!response.ok) {
    throw new Error(resData.message || 'Email transactional service returned an error');
  }

  return { success: true, service: 'formsubmit', details: resData };
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    // Validate inputs (contact and message are required)
    if (!contact || !contact.trim() || !message || !message.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email or phone contact info and a message description are required.' 
      });
    }

    const now = Date.now();
    const windowStart = now - CONTACT_WINDOW_MS;

    // Purge timestamps older than 4 hours
    contactEmailTimestamps = contactEmailTimestamps.filter(ts => ts > windowStart);

    // Rate limit check: max 10 emails per 4-hour window
    if (contactEmailTimestamps.length >= CONTACT_MAX_PER_WINDOW) {
      const oldestInWindow = contactEmailTimestamps[0];
      const remainingMs = (oldestInWindow + CONTACT_WINDOW_MS) - now;
      const remainingMinutes = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));
      
      console.warn(`[CONTACT RATE LIMIT] 10 messages reached in 4h window. Blocked until ${remainingMinutes}m.`);
      return res.status(429).json({
        success: false,
        rateLimited: true,
        error: `Rate limit reached. A maximum of 10 messages can be sent per 4-hour window. Please try again in ${remainingMinutes} minutes.`
      });
    }

    const contactData = {
      id: Date.now() + Math.random().toString(36).substr(2, 7),
      name: (name || '').trim(),
      contact: contact.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    // Forward email via transactional email service (throws if delivery fails)
    await forwardContactEmail(contactData);

    // Register timestamp for rate limiting ONLY after successful email trigger
    contactEmailTimestamps.push(now);

    // Save to persistent storage
    saveContact(contactData);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.'
    });
  } catch (err) {
    console.error('Error processing contact submission:', err);
    return res.status(502).json({ 
      success: false, 
      error: err.message || 'Failed to deliver message. Please check your internet connection and try again.' 
    });
  }
});

// ==========================================
// REQUEST A PANDAL & RATE LIMITING BACKEND
// ==========================================
const PANDAL_REQ_MAX_PER_WINDOW = 10;
const PANDAL_REQ_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 hours
let pandalRequestTimestamps = [];
const PANDAL_REQS_FILE = path.resolve('pandal_requests.json');

function loadPandalRequests() {
  try {
    if (fs.existsSync(PANDAL_REQS_FILE)) {
      return JSON.parse(fs.readFileSync(PANDAL_REQS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error("Error reading pandal requests file:", e);
  }
  return [];
}

function savePandalRequest(requestItem) {
  try {
    const list = loadPandalRequests();
    list.push(requestItem);
    fs.writeFileSync(PANDAL_REQS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error saving pandal request to file:", e);
  }
}

async function forwardPandalRequestEmail(pandalData) {
  const { pandalName, area, location, notes, coords, timestamp } = pandalData;
  const targetEmail = 'saikatsom234@gmail.com';
  const coordsStr = coords && coords.lat && coords.lng ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : 'Not provided';
  const locationStr = location || 'Not provided';
  const notesStr = notes || 'None';

  console.log(`[PANDAL REQUEST SUBMISSION] Dispatching real email to ${targetEmail}`);
  console.log(`  Pandal: ${pandalName}`);
  console.log(`  Area: ${area}`);
  console.log(`  Location: ${locationStr}`);
  console.log(`  GPS Coords: ${coordsStr}`);
  console.log(`  Notes: ${notesStr}`);
  console.log(`  Time: ${timestamp}`);

  // 1. Direct Gmail / SMTP delivery if credentials provided in environment
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `"Pujo Porikroma Pandal Requests" <${smtpUser}>`,
        to: targetEmail,
        subject: `[Pujo Porikroma Pandal Request] ${pandalName} (${area})`,
        text: `New Pandal Request Received:\n\nPandal Name: ${pandalName}\nArea: ${area}\nLocation Link/Text: ${locationStr}\nGPS Coordinates: ${coordsStr}\nAdditional Notes: ${notesStr}\nTime: ${timestamp}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #181210; color: #f5e6d3; padding: 24px; border-radius: 12px; max-width: 600px;">
            <h2 style="color: #ffaa44; margin-top: 0;">Pujo Porikroma - New Pandal Request</h2>
            <p><strong>Pandal Name:</strong> <span style="font-size: 16px; font-weight: bold; color: #ffffff;">${pandalName}</span></p>
            <p><strong>Area:</strong> ${area}</p>
            <p><strong>Location:</strong> ${locationStr}</p>
            <p><strong>GPS Coordinates:</strong> ${coordsStr}</p>
            <p><strong>Submitted At:</strong> ${timestamp}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.2); margin: 16px 0;" />
            <h3 style="color: #ffffff;">Additional Notes:</h3>
            <div style="background: #241c19; padding: 16px; border-radius: 8px; white-space: pre-wrap; color: #ffffff;">${notesStr}</div>
          </div>
        `
      });
      console.log(`[PANDAL REQUEST EMAIL] Successfully dispatched via Gmail SMTP to ${targetEmail}`);
      return { success: true, service: 'smtp' };
    } catch (smtpErr) {
      console.error("[PANDAL REQUEST EMAIL] SMTP error, falling back to transactional email service:", smtpErr.message);
    }
  }

  // 2. Transactional email gateway connected directly to saikatsom234@gmail.com
  const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'http://localhost:5173',
      'Referer': 'http://localhost:5173/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      name: "Pujo Porikroma Contributor",
      pandalName: pandalName,
      area: area,
      location: locationStr,
      gpsCoords: coordsStr,
      notes: notesStr,
      message: `[New Pandal Request]\nPandal Name: ${pandalName}\nArea: ${area}\nLocation: ${locationStr}\nGPS: ${coordsStr}\nNotes: ${notesStr}\nTime: ${timestamp}`,
      _subject: `[Pujo Porikroma Pandal Request] ${pandalName} (${area})`,
      _captcha: "false",
      _template: "table"
    })
  });

  const resData = await response.json();
  console.log(`[PANDAL REQUEST EMAIL] Transactional email service response:`, resData);

  if (!response.ok) {
    throw new Error(resData.message || 'Email transactional service returned an error');
  }

  return { success: true, service: 'formsubmit', details: resData };
}

app.post('/api/request-pandal', async (req, res) => {
  try {
    const { pandalName, area, location, notes, coords } = req.body;

    // 1. Mandatory field validation
    if (!pandalName || !pandalName.trim() || !area || !area.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Pandal name and Area are strictly required.'
      });
    }

    const trimmedName = pandalName.trim();
    const trimmedArea = area.trim();
    const trimmedLocation = (location || '').trim();
    const trimmedNotes = (notes || '').trim();

    // 2. Duplicate checking against existing database of 274+ pandals
    const duplicateResult = checkPandalDuplicate(trimmedName, trimmedArea, trimmedLocation, coords);
    if (duplicateResult.isDuplicate) {
      const existingName = duplicateResult.matchedPandal?.name || trimmedName;
      console.warn(`[PANDAL DUPLICATE BLOCKED] Request for "${trimmedName}" matched existing pandal "${existingName}" (${duplicateResult.reason})`);
      return res.status(409).json({
        success: false,
        duplicate: true,
        matchedPandal: duplicateResult.matchedPandal,
        error: `"${existingName}" is already listed on the map.`
      });
    }

    // Check against pending requests
    const existingRequests = loadPandalRequests();
    const lowerName = trimmedName.toLowerCase();
    const alreadyRequested = existingRequests.find(r => r.pandalName && r.pandalName.toLowerCase() === lowerName);
    if (alreadyRequested) {
      console.warn(`[PANDAL REQUEST DUPLICATE] "${trimmedName}" was already requested previously.`);
      return res.status(409).json({
        success: false,
        duplicate: true,
        error: `A request for "${trimmedName}" has already been submitted and is currently being reviewed.`
      });
    }

    // 3. Sliding-window rate limiting: max 10 requests per 4-hour window
    const now = Date.now();
    const windowStart = now - PANDAL_REQ_WINDOW_MS;
    pandalRequestTimestamps = pandalRequestTimestamps.filter(ts => ts > windowStart);

    if (pandalRequestTimestamps.length >= PANDAL_REQ_MAX_PER_WINDOW) {
      const oldestInWindow = pandalRequestTimestamps[0];
      const remainingMs = (oldestInWindow + PANDAL_REQ_WINDOW_MS) - now;
      const remainingMinutes = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));

      console.warn(`[PANDAL REQ RATE LIMIT] 10 requests reached in 4h window. Blocked until ${remainingMinutes}m.`);
      return res.status(429).json({
        success: false,
        rateLimited: true,
        error: `Rate limit reached. A maximum of 10 pandal requests can be sent per 4-hour window. Please try again in ${remainingMinutes} minutes.`
      });
    }

    const requestData = {
      id: Date.now() + Math.random().toString(36).substr(2, 7),
      pandalName: trimmedName,
      area: trimmedArea,
      location: trimmedLocation,
      notes: trimmedNotes,
      coords: coords || null,
      timestamp: new Date().toISOString()
    };

    // Forward email via transactional email service (throws if delivery fails)
    await forwardPandalRequestEmail(requestData);

    // Register timestamp for rate limiting ONLY after successful email dispatch
    pandalRequestTimestamps.push(now);

    // Save to persistent storage
    savePandalRequest(requestData);

    return res.status(200).json({
      success: true,
      message: 'Pandal request sent successfully! We will review and add it to the map soon.'
    });
  } catch (err) {
    console.error('Error processing pandal request:', err);
    return res.status(502).json({
      success: false,
      error: err.message || 'Failed to deliver pandal request. Please check your internet connection and try again.'
    });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO backend server running on http://0.0.0.0:${PORT}`);
});
