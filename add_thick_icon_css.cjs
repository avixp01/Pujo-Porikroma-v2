const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const cssToAdd = `
/* Custom PNG Icons for Modes */
.custom-mode-icon {
  width: 24px;
  height: 24px;
  background-color: currentColor;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  /* Multi-directional drop-shadow to boldly thicken the transparent PNG lines */
  filter: drop-shadow(0.5px 0 0 currentColor) 
          drop-shadow(-0.5px 0 0 currentColor) 
          drop-shadow(0 0.5px 0 currentColor) 
          drop-shadow(0 -0.5px 0 currentColor)
          drop-shadow(0.5px 0.5px 0 currentColor)
          drop-shadow(-0.5px -0.5px 0 currentColor);
}
`;

if (!code.includes('custom-mode-icon')) {
    code += cssToAdd;
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully added custom-mode-icon CSS");
} else {
    console.log("Already added CSS");
}
