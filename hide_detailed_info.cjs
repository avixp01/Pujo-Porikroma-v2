const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Wrap the middle cards with a condition
const middleTarget = `<div className="preview-status-row">`;
const middleReplacement = `{(!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category)) && (
          <>
            <div className="preview-status-row">`;

code = code.replace(middleTarget, middleReplacement);

const endMiddleTarget = `</div>
  
            <div className="preview-actions">`;
const endMiddleReplacement = `</div>
          </>
        )}
  
            <div className="preview-actions">`;

code = code.replace(endMiddleTarget, endMiddleReplacement);


// Wrap the Route button with the same condition, and adjust Navigate button
const navigateTarget = `<button className="btn-navigate">`;
const navigateReplacement = `<button className="btn-navigate" style={{ flex: (!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category)) ? undefined : 1 }}>`;
code = code.replace(navigateTarget, navigateReplacement);

const routeTarget = `<button className="btn-route">`;
const routeReplacement = `{(!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category)) && (
              <button className="btn-route">`;
code = code.replace(routeTarget, routeReplacement);

const endRouteTarget = `</button>
            </div>
          </div>`;
const endRouteReplacement = `</button>
              )}
            </div>
          </div>`;
code = code.replace(endRouteTarget, endRouteReplacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully conditionally hid the detailed boxes for toilets, metro, and train");
