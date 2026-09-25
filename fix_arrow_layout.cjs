const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// The previous script replaced the h3 with a flex container.
// Let's replace it back to a standard h3 with an inline arrow.

code = code.replace(
  /<h3 style=\{\{ display: 'flex', alignItems: 'center' \}\}>\{theme\.title\} <ArrowRight size=\{22\} style=\{\{ marginLeft: '6px' \}\} \/><\/h3>/,
  `<h3>
                    {theme.title}
                    <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px' }}>
                      <ArrowRight size={22} color="white" style={{ flexShrink: 0 }} />
                    </span>
                  </h3>`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Fixed arrow rendering and layout inside h3");
