const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update renderSearchItem to allow multiline wrapping
const regex = /<div className="flex-1 min-w-0 pr-2">[\s\S]*?<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>[\s\S]*?<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>[\s\S]*?\{theme\.icon\}[\s\S]*?<\/div>[\s\S]*?\{loc\.name\}[\s\S]*?<\/div>[\s\S]*?<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' \}\}>[\s\S]*?\{categoryDisplay\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?\{distFormatted && \([\s\S]*?<div className="shrink-0 flex flex-col items-end justify-center">/g;

const newDiv = `<div className="flex-1 min-w-0" style={{ paddingRight: '12px' }}>
            <div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {theme.icon}
                </div>
                <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: '1.2' }}>
                  {loc.name}
                </div>
              </div>
            <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '4px', marginLeft: '23px' }}>
              {categoryDisplay}
            </div>
          </div>
          {distFormatted && (
              <div className="shrink-0 flex flex-col items-end justify-center" style={{ paddingRight: '3px' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, newDiv);
    console.log("Successfully updated renderSearchItem for multiline wrapping!");
} else {
    console.log("Could not find original renderSearchItem!");
}

// 2. Fix the dropdown container to prevent it from stretching beyond the screen
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
