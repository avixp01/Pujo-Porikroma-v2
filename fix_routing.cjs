const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Fix Duration Calculation
const durationRegex = /const totalMins = Math\.ceil\(routeData\.duration \/ 60\);/g;
if (durationRegex.test(code)) {
    code = code.replace(durationRegex, `const totalMins = Math.ceil((routeData.distance / 1.2) / 60);`);
}

// 2. Fix Step Rendering Logic
const stepRegex = /\{routeData\.steps\.map\(\(step, idx\) => \([\s\S]*?<\/div>\s*<\/div>\s*\)\)\}/;
const newStepLogic = `{routeData.steps.map((step, idx) => (
                        <div className="step-item" key={idx}>
                          <div className="step-icon-col">
                            {(() => {
                              const isLeft = step.maneuver.modifier && step.maneuver.modifier.includes('left');
                              const isRight = step.maneuver.modifier && step.maneuver.modifier.includes('right');
                              const isUTurn = step.maneuver.modifier === 'uturn';
                              let transform = 'rotate(0deg)';
                              if (isLeft) transform = 'rotate(-90deg)';
                              else if (isRight) transform = 'rotate(90deg)';
                              else if (isUTurn) transform = 'rotate(180deg)';
                              return (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform, transition: 'transform 0.3s ease' }}>
                                  <path d="M12 19V5M5 12l7-7 7 7"/>
                                </svg>
                              );
                            })()}
                          </div>
                          <div className="step-content border-b">
                            <div className="step-instruction">{(() => {
                              const maneuver = step.maneuver;
                              const { type, modifier } = maneuver;
                              let text = 'Head straight';
                              
                              if (type === 'turn') {
                                text = modifier ? \`Turn \${modifier}\` : 'Turn';
                              } else if (type === 'new name') {
                                text = \`Continue onto\`;
                              } else if (type === 'depart') {
                                text = \`Head \${modifier || 'straight'}\`;
                              } else if (type === 'arrive') {
                                text = \`Arrive at destination\`;
                              } else if (type === 'merge') {
                                text = modifier ? \`Merge \${modifier}\` : 'Merge';
                              } else if (type === 'on ramp') {
                                text = modifier ? \`Take the ramp on the \${modifier}\` : 'Take the ramp';
                              } else if (type === 'off ramp') {
                                text = modifier ? \`Take the exit on the \${modifier}\` : 'Take the exit';
                              } else if (type === 'fork') {
                                text = modifier ? \`Keep \${modifier} at the fork\` : 'Keep straight at fork';
                              } else if (type === 'end of road') {
                                text = modifier ? \`Turn \${modifier} at the end of the road\` : 'Turn at the end of the road';
                              } else if (type === 'roundabout' || type === 'rotary') {
                                text = \`Enter the roundabout\`;
                              }
                              
                              if (step.name && step.name !== '') {
                                text += \` onto \${step.name}\`;
                              }
                              
                              return text.charAt(0).toUpperCase() + text.slice(1);
                            })()}</div>
                            <div className="step-distance">{step.distance >= 1000 ? (step.distance / 1000).toFixed(1) + ' km' : Math.round(step.distance) + ' m'}</div>
                          </div>
                        </div>
                      ))}`;

if (stepRegex.test(code)) {
    code = code.replace(stepRegex, newStepLogic);
} else {
    console.log("Could not find step logic rendering block.");
}

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully fixed duration and turn-by-turn routing!");
