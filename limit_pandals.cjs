const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target1 = `                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        setPlannedStops([...plannedStops, selectedLocation]);
                        setActiveTab('routes');
                      } else {
                        setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                      }`;

const replace1 = `                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        if (plannedStops.length >= 10) return;
                        setPlannedStops([...plannedStops, selectedLocation]);
                        setActiveTab('routes');
                      } else {
                        setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                      }`;

const target2 = `                    {selectedLocation && selectedLocation.type === 'train' ? (
                      <><Clock size={18} /> Timetable</>
                    ) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                      <>✔ Added</>
                    ) : (
                      <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                    )}`;

const replace2 = `                    {selectedLocation && selectedLocation.type === 'train' ? (
                      <><Clock size={18} /> Timetable</>
                    ) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                      <>✔ Added</>
                    ) : plannedStops.length >= 10 ? (
                      <>Route Full</>
                    ) : (
                      <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                    )}`;

const safeReplace = (targetStr, replaceStr) => {
  const targetLF = targetStr.replace(/\r\n/g, '\n');
  const replaceLF = replaceStr.replace(/\r\n/g, '\n');
  if (code.includes(targetStr)) {
    code = code.replace(targetStr, replaceStr);
  } else if (code.includes(targetLF)) {
    code = code.replace(targetLF, replaceLF);
  } else {
    console.log('Error: target not found for', targetStr.substring(0, 30));
  }
};

safeReplace(target1, replace1);
safeReplace(target2, replace2);

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done limits');
