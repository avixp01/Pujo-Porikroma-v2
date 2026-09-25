const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace the Tailwind header with an inline styled header
code = code.replace(
  '<div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400 mb-1">NEARBY</div>',
  '<div style={{ padding: \'8px 20px\', fontSize: \'11px\', fontWeight: \'bold\', letterSpacing: \'0.05em\', color: \'#9ca3af\', marginBottom: \'4px\', display: \'block\', width: \'100%\', textAlign: \'left\' }}>NEARBY</div>'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Swapped Tailwind header for inline styled header.');
