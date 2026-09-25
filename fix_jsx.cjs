const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// The start wrapper
const targetStart = `            ) : (

            {/* Static Home Button (Pinned) */}`;
const replacementStart = `            ) : (
              <>
            {/* Static Home Button (Pinned) */}`;
code = code.replace(targetStart, replacementStart);

// The end wrapper
const targetEnd = `                </div>
              ))}
            
            )}
          </div>
        )}`;
const replacementEnd = `                </div>
              ))}
            </div>
            </>
            )}
          </div>
        )}`;
code = code.replace(targetEnd, replacementEnd);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Fixed JSX syntax error!");
