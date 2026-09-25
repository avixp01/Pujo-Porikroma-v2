const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// Add import
if (!code.includes("import { ArrowRight } from 'lucide-react';")) {
  code = code.replace(
    /import '\.\/PujoThemeCards\.css';/,
    `import './PujoThemeCards.css';\nimport { ArrowRight } from 'lucide-react';`
  );
}

// Update <h3>
code = code.replace(
  /<h3>\{theme\.title\}<\/h3>/,
  `<h3 style={{ display: 'flex', alignItems: 'center' }}>{theme.title} <ArrowRight size={22} style={{ marginLeft: '6px' }} /></h3>`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Added arrow to titles");
