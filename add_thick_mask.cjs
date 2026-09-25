const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const cssToAdd = `
.thick-mask-icon {
  background-color: currentColor;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  /* Thickens the mask shape */
  filter: drop-shadow(0.5px 0 0 currentColor) 
          drop-shadow(-0.5px 0 0 currentColor) 
          drop-shadow(0 0.5px 0 currentColor) 
          drop-shadow(0 -0.5px 0 currentColor)
          drop-shadow(0.3px 0.3px 0 currentColor)
          drop-shadow(-0.3px -0.3px 0 currentColor);
  display: inline-block;
}
`;

if (!code.includes('thick-mask-icon')) {
    code += cssToAdd;
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Added thick-mask-icon CSS");
} else {
    console.log("CSS already exists");
}
