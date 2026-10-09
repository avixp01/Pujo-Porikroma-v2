const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /\{routeData\.steps && routeData\.steps\.map\(\(step, idx\) => \([\s\S]*?<div className="step-distance">\{step\.distance/g;

const replacement = `{routeData.steps && routeData.steps.map((step, idx) => {
                        const maneuver = step.maneuver || {};
                        const { type = '', modifier = '' } = maneuver;
                        
                        let text = 'Head straight';
                        if (type === 'turn') text = modifier ? \`Turn \${modifier}\` : 'Turn';
                        else if (type === 'new name' || type === 'continue') text = modifier ? \`Continue \${modifier}\` : 'Continue straight';
                        else if (type === 'depart') text = \`Head \${modifier || 'straight'}\`;
                        else if (type === 'arrive') text = 'Arrive at destination';
                        else if (type === 'merge') text = modifier ? \`Merge \${modifier}\` : 'Merge';
                        else if (type === 'on ramp') text = modifier ? \`Take the ramp on the \${modifier}\` : 'Take the ramp';
                        else if (type === 'off ramp') text = modifier ? \`Take the exit on the \${modifier}\` : 'Take the exit';
                        else if (type === 'fork') text = modifier ? \`Keep \${modifier} at the fork\` : 'Keep straight at fork';
                        else if (type === 'end of road') text = modifier ? \`Turn \${modifier} at the end of the road\` : 'Turn at the end of the road';
                        else if (type === 'roundabout' || type === 'rotary') text = 'Enter the roundabout';
                        else if (modifier) text = \`Head \${modifier}\`; // Fallback for unhandled types with modifier
                        
                        if (step.name && step.name !== '') text += \` onto \${step.name}\`;
                        text = text.charAt(0).toUpperCase() + text.slice(1);

                        // Icon logic strongly tied to the text/modifier
                        let transform = 'rotate(0deg)';
                        const lowerText = text.toLowerCase();
                        if (lowerText.includes('uturn') || lowerText.includes('u-turn') || modifier === 'uturn') {
                          transform = 'rotate(180deg)';
                        } else if (lowerText.includes('left') || modifier.includes('left')) {
                          transform = 'rotate(-90deg)';
                        } else if (lowerText.includes('right') || modifier.includes('right')) {
                          transform = 'rotate(90deg)';
                        }

                        return (
                        <div className="step-item" key={idx}>
                          <div className="step-icon-col">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform, transition: 'transform 0.3s ease' }}>
                              <path d="M12 19V5M5 12l7-7 7 7"/>
                            </svg>
                          </div>
                          <div className="step-content border-b">
                            <div className="step-instruction">{text}</div>
                            <div className="step-distance">{step.distance`;

if (code.match(regex)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully fixed step text and arrow alignment.");
} else {
    console.log("Could not find the map block to replace.");
}
