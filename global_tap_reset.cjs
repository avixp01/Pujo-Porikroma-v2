const fs = require('fs');

let code = fs.readFileSync('src/index.css', 'utf8');

const globalReset = `

/* Global Tap Highlight and Outline Reset */
button, a, input, select, textarea, [role='button'] {
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;
}

button:focus, a:focus, input:focus, select:focus, textarea:focus, [role='button']:focus {
  outline: none !important;
}
`;

if (!code.includes('Global Tap Highlight and Outline Reset')) {
    code += globalReset;
    fs.writeFileSync('src/index.css', code, 'utf8');
    console.log("Successfully added global tap highlight removal");
} else {
    console.log("Already added");
}
