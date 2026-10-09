const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The goal is to move the closing `</div>` of `.route-timeline-list` from above the `<button>` to below the `<button>`.

let lines = content.split('\n');

let buttonIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('backgroundColor: \'#fff7ed\'') && lines[i].includes('Next stop') === false) {
        // This is the line with the button style
        buttonIndex = i;
        break;
    }
}

if (buttonIndex !== -1) {
    let divIndex = -1;
    // Find the `</div>` just before this button
    for (let i = buttonIndex - 1; i >= 0; i--) {
        if (lines[i].trim() === '</div>') {
            divIndex = i;
            break;
        }
    }

    let endButtonIndex = -1;
    // Find the `</button>` after this button
    for (let i = buttonIndex; i < lines.length; i++) {
        if (lines[i].includes('</button>')) {
            endButtonIndex = i;
            break;
        }
    }

    if (divIndex !== -1 && endButtonIndex !== -1) {
        // Remove the </div>
        lines.splice(divIndex, 1);
        
        // Add it back after the </button>
        // But remember that splicing changes the indices! 
        // We removed a line before endButtonIndex, so endButtonIndex is now endButtonIndex - 1.
        lines.splice(endButtonIndex, 0, '                  </div>');
        
        fs.writeFileSync(file, lines.join('\n'), 'utf8');
        console.log("Successfully moved the </div> to fix the button layout!");
    } else {
        console.log("Could not find div or button ending tags.");
    }
} else {
    console.log("Could not find the button starting line.");
}
