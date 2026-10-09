const fs = require('fs');
let lines = fs.readFileSync('src/components/MapPage.jsx', 'utf8').split('\n');

const newWalkingSteps = `                      {routeData.steps && routeData.steps.map((step, idx) => {
                        const maneuver = step.maneuver || {};
                        const { type = '', modifier = '' } = maneuver;
                        let text = 'Head straight';
                        if (type === 'turn') text = modifier ? \`Turn \${modifier}\` : 'Turn';
                        else if (type === 'new name' || type === 'continue') text = modifier ? \`Continue \${modifier}\` : 'Continue straight';
                        else if (type === 'depart') text = \`Head \${modifier || 'straight'}\`;
                        else if (type === 'arrive') text = 'Arrive';
                        else if (modifier) text = \`Head \${modifier}\`;
                        
                        if (step.name && step.name !== '') text += \` onto \${step.name}\`;
                        text = text.charAt(0).toUpperCase() + text.slice(1);

                        let transform = 'rotate(0deg)';
                        const lowerText = text.toLowerCase();
                        if (lowerText.includes('uturn') || lowerText.includes('u-turn') || modifier === 'uturn') transform = 'rotate(180deg)';
                        else if (lowerText.includes('left') || modifier.includes('left')) transform = 'rotate(-90deg)';
                        else if (lowerText.includes('right') || modifier.includes('right')) transform = 'rotate(90deg)';

                        return (
                          <div className="step-item" key={idx}>
                            <div className="step-icon-col">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform }}>
                                <path d="M12 19V5M5 12l7-7 7 7"/>
                              </svg>
                            </div>
                            <div className="step-content border-b">
                              <div className="step-instruction">{text}</div>
                              <div className="step-distance">{step.distance >= 1000 ? (step.distance / 1000).toFixed(1) + ' km' : Math.round(step.distance || 0) + ' m'}</div>
                            </div>
                          </div>
                        );
                      })}`;

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('routeData.steps.map((step, idx) => (')) {
    startIndex = i;
  }
  if (startIndex !== -1 && i > startIndex && lines[i].includes('))}')) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1, newWalkingSteps);
  fs.writeFileSync('src/components/MapPage.jsx', lines.join('\n'), 'utf8');
  console.log('Successfully fixed walking steps logic.');
} else {
  console.log('Could not find boundaries for walking steps map.');
}
