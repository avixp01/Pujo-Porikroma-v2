const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const oldFilter = `filter: drop-shadow(0.5px 0 0 currentColor) 
          drop-shadow(-0.5px 0 0 currentColor) 
          drop-shadow(0 0.5px 0 currentColor) 
          drop-shadow(0 -0.5px 0 currentColor)
          drop-shadow(0.5px 0.5px 0 currentColor)
          drop-shadow(-0.5px -0.5px 0 currentColor);`;

const newFilter = `filter: drop-shadow(1px 0 0 currentColor) 
          drop-shadow(-1px 0 0 currentColor) 
          drop-shadow(0 1px 0 currentColor) 
          drop-shadow(0 -1px 0 currentColor)
          drop-shadow(0.7px 0.7px 0 currentColor)
          drop-shadow(-0.7px -0.7px 0 currentColor)
          drop-shadow(0.7px -0.7px 0 currentColor)
          drop-shadow(-0.7px 0.7px 0 currentColor);`;

if (code.includes('drop-shadow(0.5px')) {
    code = code.replace(oldFilter, newFilter);
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully increased icon thickness");
} else {
    console.log("Could not find the target CSS");
}
