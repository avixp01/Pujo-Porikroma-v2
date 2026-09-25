const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const css = `
/* Share Update Popup */
.share-update-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 20000;
  display: flex;
  align-items: flex-end;
}

.share-update-popup {
  background: white;
  width: 100%;
  border-radius: 24px 24px 0 0;
  padding: 20px;
  padding-bottom: max(20px, env(safe-area-inset-bottom));
  box-shadow: 0 -10px 25px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.share-popup-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.share-popup-close {
  position: absolute;
  left: 0;
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;
}

.share-popup-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.share-popup-location {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.share-loc-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.share-loc-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.share-popup-desc {
  font-size: 13px;
  color: #4b5563;
  margin: 0 0 20px 0;
}

.share-section {
  margin-bottom: 24px;
}

.share-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.rain-options {
  display: flex;
  gap: 8px;
}

.rain-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 4px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
}

.rain-btn.active {
  background: #fef2f2;
  border-color: #fca5a5;
}

.rain-btn span {
  font-size: 12px;
  font-weight: 500;
  color: #4b5563;
}

.rain-btn.active span {
  color: #b91c1c;
}

.crowd-display {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.crowd-score {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -2px;
}

.crowd-text-container {
  display: flex;
  flex-direction: column;
}

.crowd-status {
  font-size: 16px;
  font-weight: 700;
}

.crowd-subtext {
  font-size: 13px;
  color: #6b7280;
}

.crowd-slider-container {
  padding: 0 4px;
}

.crowd-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  outline: none;
  margin-bottom: 8px;
}

.crowd-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: currentColor;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
}

.slider-labels span {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 600;
}

.share-popup-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
}

.share-warning {
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.share-submit-btn {
  background: #e5e7eb;
  color: #9ca3af;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  width: 100%;
  text-align: center;
}

.share-not-now-btn {
  background: transparent;
  color: #6b7280;
  border: none;
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.dark-mode .share-update-popup {
  background: #1e1e1e;
}
.dark-mode .share-popup-title,
.dark-mode .share-loc-title,
.dark-mode .share-section-title {
  color: #f9fafb;
}
.dark-mode .share-popup-close,
.dark-mode .share-warning {
  background: #2d2d2d;
  color: #d1d5db;
}
.dark-mode .rain-btn {
  background: #1e1e1e;
  border-color: #374151;
}
.dark-mode .rain-btn.active {
  background: #2d1818;
  border-color: #7f1d1d;
}
.dark-mode .rain-btn span,
.dark-mode .share-loc-subtitle,
.dark-mode .share-popup-desc,
.dark-mode .crowd-subtext {
  color: #9ca3af;
}
.dark-mode .share-submit-btn {
  background: #374151;
  color: #6b7280;
}
`;

fs.appendFileSync('src/components/MapPage.css', css, 'utf8');
console.log("Successfully appended CSS for Share Update popup");
