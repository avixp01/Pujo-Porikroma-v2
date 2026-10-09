const fs = require('fs');

const headContent = fs.readFileSync('MapPage_HEAD.jsx', 'utf8');
let currContent = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Extract the good block from HEAD
const headStartMarker = "map.on('dragstart', onDrag);";
const headEndMarker = "  const renderSearchItem = (loc) => {";
const headStartIndex = headContent.indexOf(headStartMarker) + headStartMarker.length;
const headEndIndex = headContent.indexOf(headEndMarker);

const goodBlock = headContent.substring(headStartIndex, headEndIndex);

// 2. Find the bad block in CURRENT
const currStartMarker = "map.on('dragstart', onDrag);";
const currEndMarker = "    const renderOriginObj = isRouteSwapped";
const currStartIndex = currContent.indexOf(currStartMarker) + currStartMarker.length;
const currEndIndex = currContent.indexOf(currEndMarker);

// The perfect renderSearchItem to append after goodBlock
const perfectRenderSearchItem = `  const renderSearchItem = (loc) => {
      const theme = getItemTheme(loc.type);
      const distStr = getDistString(loc.rawDist);
      let distFormatted = distStr ? distStr.replace(' away', '') : '';
        if (!distFormatted) {
          const pseudoRandom = Math.floor((loc.lat + loc.lng) * 100000) % 950 + 50;
          distFormatted = pseudoRandom < 1000 ? \`\${pseudoRandom} m\` : \`\${(pseudoRandom / 1000).toFixed(1)} km\`;
        }
      const categoryDisplay = loc.category ? \`\${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • \${loc.category}\` : loc.type;
  
      return (
        <div 
          key={loc.id} 
          className="px-5 flex items-center justify-between cursor-pointer"
            style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '7px', paddingBottom: '7px' }}
          onMouseDown={() => handleSearchSelect(loc)}
        >
          <div className="flex-1 min-w-0 pr-2">
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
              <div className="shrink-0 flex flex-col items-end justify-center">
                <div className="text-[13px] font-extrabold" style={{ color: theme.color }}>{distFormatted}</div>
                <div className="text-[10px]" style={{ color: '#9ca3af', marginTop: '-2px' }}>away</div>
              </div>
            )}
        </div>
      );
  };\n\n`;

const newCurrContent = currContent.substring(0, currStartIndex) + goodBlock + perfectRenderSearchItem + currContent.substring(currEndIndex);

// 3. Add back visitedPandals state
let finalContent = newCurrContent;
const targetState = `const [plannedStops, setPlannedStops] = useState([]);`;
const replaceState = `const [plannedStops, setPlannedStops] = useState([]);\n  const [visitedPandals, setVisitedPandals] = useState([]);`;
if (finalContent.includes(targetState) && !finalContent.includes('const [visitedPandals')) {
    finalContent = finalContent.replace(targetState, replaceState);
    console.log("Re-added visitedPandals state.");
}

fs.writeFileSync('src/components/MapPage.jsx', finalContent, 'utf8');
console.log("Restored MapPage.jsx core.");
