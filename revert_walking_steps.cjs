const fs = require('fs');
let lines = fs.readFileSync('src/components/MapPage.jsx', 'utf8').split('\n');

const revertedWalkingSteps = `                      {routeData.steps && routeData.steps.map((step, idx) => (
                        <div className="step-item" key={idx}>
                          <div className="step-icon-col">
                            {step.maneuver?.type?.includes('turn') || step.maneuver?.modifier ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                            )}
                          </div>
                          <div className="step-content border-b">
                            <div className="step-instruction">{step.maneuver?.instruction || \`Head \${step.maneuver?.modifier || 'straight'}\`}</div>
                            <div className="step-distance">{step.distance} m</div>
                          </div>
                        </div>
                      ))}`;

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('routeData.steps.map((step, idx) => {')) {
    startIndex = i;
  }
  if (startIndex !== -1 && i > startIndex && lines[i].includes('))}')) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1, revertedWalkingSteps);
  fs.writeFileSync('src/components/MapPage.jsx', lines.join('\n'), 'utf8');
  console.log('Successfully reverted walking steps logic.');
} else {
  console.log('Could not find boundaries for walking steps map.');
}
