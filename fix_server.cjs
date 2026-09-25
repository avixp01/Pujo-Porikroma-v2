const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// Remove existing app.use(express.json()) and app.use(cors())
code = code.replace(/app\.use\(cors\(\)\);\s*app\.use\(express\.json\(\)\);/, '');

// Add them after const app = express();
code = code.replace(
  /const app = express\(\);/,
  "const app = express();\napp.use(cors());\napp.use(express.json());"
);

fs.writeFileSync('server.js', code, 'utf8');
console.log('Fixed express.json middleware placement in server.js');
