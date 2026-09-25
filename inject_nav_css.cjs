const fs = require('fs');

let css = fs.readFileSync('src/components/MapPage.css', 'utf8');

const newCSS = `

/* Navigation UI Details */
.navigation-details-panel {
  flex: 1;
  overflow-y: auto;
  background: white;
  padding-bottom: 20px;
}
.dark-mode .navigation-details-panel {
  background: #121212;
}

.walk-summary, .transit-summary {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}
.dark-mode .walk-summary, .dark-mode .transit-summary {
  border-bottom-color: #374151;
}

.walk-time, .transit-time {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
}
.dark-mode .walk-time, .dark-mode .transit-time {
  color: #f9fafb;
}
.walk-dist {
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
}
.walk-warning {
  font-size: 12px;
  color: #b45309;
  background: #fef3c7;
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dark-mode .walk-warning {
  background: #451a03;
  color: #fde68a;
}
.transit-depart {
  font-size: 14px;
  color: #4b5563;
  margin-top: 4px;
}
.dark-mode .transit-depart {
  color: #9ca3af;
}

.step-item {
  display: flex;
  padding: 0 16px;
}
.step-icon-col {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  position: relative;
  color: #6b7280;
}
.dark-mode .step-icon-col {
  color: #9ca3af;
}
.dot-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid white;
  background: #1f2937;
  box-shadow: 0 0 0 1px #e5e7eb;
  z-index: 2;
}
.dark-mode .dot-icon {
  border-color: #121212;
  box-shadow: 0 0 0 1px #374151;
  background: #f9fafb;
}
.dot-icon.blue {
  background: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
.dotted-line {
  position: absolute;
  top: 32px;
  bottom: 0;
  width: 0;
  border-left: 3px dotted #9ca3af;
  z-index: 1;
}
.dark-mode .dotted-line {
  border-left-color: #4b5563;
}
.solid-line {
  position: absolute;
  top: 32px;
  bottom: 0;
  width: 4px;
  background: #9ca3af;
  z-index: 1;
}
.solid-line.blue-line {
  background: #3b82f6;
}
.train-circle-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.step-content {
  flex: 1;
  padding: 16px 0 16px 16px;
  color: #1f2937;
  font-weight: 500;
}
.dark-mode .step-content {
  color: #f9fafb;
}
.step-content.border-b {
  border-bottom: 1px solid #e5e7eb;
}
.dark-mode .step-content.border-b {
  border-bottom-color: #374151;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
}
.step-instruction {
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}
.step-distance {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}
.dark-mode .step-distance {
  color: #9ca3af;
}
.step-pill {
  display: inline-block;
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  margin: 8px 0;
}
.dark-mode .step-pill {
  background: #312e81;
  color: #e0e7ff;
}
.step-subtitle {
  font-size: 13px;
  color: #16a34a;
  font-weight: 500;
}
.step-detail {
  font-size: 13px;
  color: #6b7280;
  margin-top: 12px;
}

.start-btn-container {
  position: sticky;
  bottom: 0;
  padding: 16px;
  background: linear-gradient(to top, white 50%, rgba(255,255,255,0));
  display: flex;
  justify-content: flex-start;
  z-index: 10;
}
.dark-mode .start-btn-container {
  background: linear-gradient(to top, #121212 50%, rgba(18,18,18,0));
}
.nav-start-btn {
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
  cursor: pointer;
}
`;

fs.appendFileSync('src/components/MapPage.css', newCSS, 'utf8');
console.log("Successfully appended navigation CSS");
