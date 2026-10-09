const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');
let lines = content.split('\n');

let btnStartIdx = -1;
let divToRemoveIdx = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('backgroundColor: \'#fff7ed\'') && !lines[i].includes('Next stop')) {
        btnStartIdx = i;
        break;
    }
}

if (btnStartIdx !== -1) {
    // We want to insert `</div>` BEFORE the button
    // But first, we must find the `</div>` that is AFTER the button which we previously moved
    for (let i = btnStartIdx; i < lines.length; i++) {
        if (lines[i].includes('</button>')) {
            // The </div> we added was right after </button>
            if (lines[i+1] && lines[i+1].includes('</div>')) {
                divToRemoveIdx = i + 1;
            }
            break;
        }
    }

    if (divToRemoveIdx !== -1) {
        lines.splice(divToRemoveIdx, 1);
        lines.splice(btnStartIdx, 0, '                  </div>');
        fs.writeFileSync(file, lines.join('\n'), 'utf8');
        console.log("Successfully reverted the </div> position.");
    } else {
        console.log("Could not find the </div> after the button.");
    }
}
