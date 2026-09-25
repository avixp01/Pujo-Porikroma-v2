const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `                )}
              </div>
            )}
            </div>
          </div>
  
          {/* Filter Pills & Controls */}`;

const replacementStr = `                )}
              </div>
            )}
          </div>
  
          {/* Filter Pills & Controls */}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully fixed bottom divs.');
} else {
  // try with \r\n
  const targetStrCRLF = targetStr.replace(/\n/g, '\r\n');
  const replacementStrCRLF = replacementStr.replace(/\n/g, '\r\n');
  if (code.includes(targetStrCRLF)) {
    code = code.replace(targetStrCRLF, replacementStrCRLF);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log('Successfully fixed bottom divs (CRLF).');
  } else {
    console.log('Could not find target string for bottom divs.');
  }
}
