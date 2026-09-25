const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const oldHead = `    <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
  
    </head>`;

const newHead = `    <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    </head>`;

code = code.replace(oldHead, newHead);
fs.writeFileSync('index.html', code, 'utf8');
console.log('Added GIS script to index.html');
