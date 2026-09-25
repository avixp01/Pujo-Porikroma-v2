const fs = require('fs');

let css = fs.readFileSync('src/components/MapPage.css', 'utf8');

const popupCSS = `
/* --- Direction Popup --- */
.direction-popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 10005;
  display: flex;
  flex-direction: column;
  color: #333333;
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.direction-header {
  background-color: #f1f5f9;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.direction-top-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.direction-back-btn {
  background: transparent;
  border: none;
  padding: 8px 0;
  color: #333;
  cursor: pointer;
}

.direction-inputs-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.direction-input-group {
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 12px;
}

.direction-dots {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0;
}

.dot-start {
  width: 8px;
  height: 8px;
  border: 2px solid #3b82f6;
  border-radius: 50%;
}

.dot-line {
  flex: 1;
  width: 2px;
  background-color: #cbd5e1;
  margin: 4px 0;
}

.dot-end {
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
}

.direction-input-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.direction-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  font-size: 14px;
  outline: none;
}

.direction-input:focus {
  border-color: #3b82f6;
}

.direction-swap-btn {
  background: transparent;
  border: none;
  padding: 8px;
  color: #64748b;
  cursor: pointer;
}

.direction-modes {
  display: flex;
  justify-content: space-around;
  padding-top: 4px;
}

.mode-btn {
  background: transparent;
  border: none;
  color: #64748b;
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn.active {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.direction-list {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
}

.direction-list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
}

.direction-list-item:active {
  background-color: #f8fafc;
}

.item-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  flex-shrink: 0;
}

.item-icon.home {
  background-color: #3b82f6;
  color: #ffffff;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 16px;
}

.item-content.border-b {
  border-bottom: 1px solid #e2e8f0;
}

.item-title {
  font-weight: 600;
  font-size: 15px;
}

.item-subtitle {
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

/* --- Dark Mode Overrides for Direction Popup --- */
.direction-popup-wrapper.dark-mode {
  background-color: #121212;
  color: #e5e7eb;
}

.direction-popup-wrapper.dark-mode .direction-header {
  background-color: #1e1e1e;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}

.direction-popup-wrapper.dark-mode .direction-back-btn {
  color: #e5e7eb;
}

.direction-popup-wrapper.dark-mode .direction-input {
  background-color: #2a2a2a;
  border-color: #3f3f3f;
  color: #e5e7eb;
}

.direction-popup-wrapper.dark-mode .direction-input::placeholder {
  color: #9ca3af;
}

.direction-popup-wrapper.dark-mode .direction-swap-btn {
  color: #9ca3af;
}

.direction-popup-wrapper.dark-mode .dot-line {
  background-color: #4b5563;
}

.direction-popup-wrapper.dark-mode .mode-btn {
  color: #9ca3af;
}

.direction-popup-wrapper.dark-mode .mode-btn.active {
  background-color: #102a43;
  color: #3b82f6;
}

.direction-popup-wrapper.dark-mode .direction-list {
  background-color: #121212;
}

.direction-popup-wrapper.dark-mode .direction-list-item:active {
  background-color: #1e1e1e;
}

.direction-popup-wrapper.dark-mode .item-icon {
  background-color: #2a2a2a;
  color: #9ca3af;
}

.direction-popup-wrapper.dark-mode .item-icon.home {
  background-color: #1e3a8a;
  color: #60a5fa;
}

.direction-popup-wrapper.dark-mode .item-content.border-b {
  border-bottom-color: #2a2a2a;
}

.direction-popup-wrapper.dark-mode .item-subtitle {
  color: #9ca3af;
}
`;

if (!css.includes('direction-popup-wrapper')) {
    css += popupCSS;
    fs.writeFileSync('src/components/MapPage.css', css, 'utf8');
    console.log("Appended CSS successfully");
} else {
    console.log("CSS already exists");
}
