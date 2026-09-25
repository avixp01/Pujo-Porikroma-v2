const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const replacements = {
  'â€¢': '•',
  'â€”': '—',
  'â€“': '–',
  'Â·': '·',
  'â†’': '→',
  'ðŸ“': '📍',
  'âœ“': '✓',
  'âˆ’': '−',
  'â€²': '′',
  '?': '•',
  '?"': '—',
  '-^': '📍',
  'z': '✓'
};

// We don't know exactly what character sequences got mangled because of the terminal output, 
// so let's just do a blanket fallback: read it as latin1, decode as utf8 for any sequence that matches valid UTF-8.
// Actually, it's safer to just reverse the exact corruption PowerShell did:
// PowerShell read UTF-8 file bytes as Windows-1252, and wrote them as UTF-8.
// To reverse: read the file as UTF-8 (giving us a string).
// Convert that string to a buffer using 'latin1' (which maps 0-255 back to bytes, though Windows-1252 has some differences in 0x80-0x9F).
// Wait, PowerShell uses Windows-1252. Node's 'latin1' is ISO-8859-1.
// In ISO-8859-1, 0x80-0x9F are control characters, but Windows-1252 has printable chars there (like € at 0x80).
// If PowerShell read it as Windows-1252, it produced the '€' character. When writing as UTF-8, it wrote '€' (E2 82 AC).
// So simply replacing `â€¢` with `•` is the absolute safest way to fix the UI text without risking destroying the whole file.

code = code.replace(/â€¢/g, '•');
code = code.replace(/â€”/g, '—');
code = code.replace(/Â·/g, '·');
code = code.replace(/â†’/g, '→');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed common garbled characters.');
