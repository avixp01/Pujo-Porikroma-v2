const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `                  </>
                )}
              </div>
            )}
          </div>
  
          {/* Filter Pills & Controls */}`;

const replacement = `                  </>
                )}
              </div>
            )}
            </div>
          </div>
  
          {/* Filter Pills & Controls */}`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully fixed syntax error.');
} else {
  console.log('Target string not found in MapPage.jsx. Trying alternative...');
  const altTarget = `                )}
              </div>
            )}
          </div>`;
  const altReplacement = `                )}
              </div>
            )}
            </div>
          </div>`;
  const index = code.lastIndexOf(altTarget);
  if (index !== -1) {
    code = code.substring(0, index) + altReplacement + code.substring(index + altTarget.length);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log('Successfully fixed using alternative fallback.');
  } else {
    console.log('Could not find the target string at all.');
  }
}
