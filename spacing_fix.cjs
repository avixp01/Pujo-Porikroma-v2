const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The current bad code is the original one:
const regex = /<div className="flex-1 min-w-0 pr-2">[\s\S]*?<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>[\s\S]*?<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>[\s\S]*?\{theme\.icon\}[\s\S]*?<\/div>[\s\S]*?\{loc\.name\}[\s\S]*?<\/div>[\s\S]*?<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' \}\}>[\s\S]*?\{categoryDisplay\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?\{distFormatted && \([\s\S]*?<div className="shrink-0 flex flex-col items-end justify-center">/g;

// We will replace it with properly truncated text, AND add 3px padding where requested.
const newDiv = `<div className="flex-1 min-w-0" style={{ paddingRight: '3px' }}>
            <div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {theme.icon}
              </div>
              <div className="truncate flex-1 min-w-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {loc.name}
              </div>
            </div>
            <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' }}>
              {categoryDisplay}
            </div>
          </div>
          {distFormatted && (
              <div className="shrink-0 flex flex-col items-end justify-center" style={{ paddingRight: '3px' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, newDiv);
    console.log("Successfully updated renderSearchItem truncation with 3px gaps!");
} else {
    console.log("Could not find original renderSearchItem!");
}

// 2. Fix the dropdown container stretching
// It's currently width: 'auto', which causes the text to push it off the edge of the screen!
const dropdownOld = /className="absolute top-full z-\[10001\] pointer-events-auto flex flex-col overflow-y-auto"[\s\S]*?style=\{\{[\s\S]*?left: '4px',[\s\S]*?right: '4px',[\s\S]*?width: 'auto',/g;

const dropdownNew = `className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"
                style={{
                    left: '4px',
                    right: '4px',
                    width: 'calc(100% - 8px)',
                    overflowX: 'hidden',`;

if (dropdownOld.test(content)) {
    content = content.replace(dropdownOld, dropdownNew);
    console.log("Successfully constrained dropdown container!");
} else {
    console.log("Could not find dropdown container! Maybe it's already constrained.");
}

fs.writeFileSync(file, content, 'utf8');
