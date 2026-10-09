const fs = require('fs');
let code = fs.readFileSync('src/data/allPujos.js', 'utf8');

// Add import
if (!code.includes('batchFivePujos')) {
    code = code.replace(
        "import { batchFourPujos } from './pujos-part4.js';",
        "import { batchFourPujos } from './pujos-part4.js';\nimport { pujoBatch5 as batchFivePujos } from './pujo-batch5.js';"
    );
    
    // Add to rawPujos
    code = code.replace(
        "const rawPujos = [...batchOnePujos, ...batchTwoPujos, ...batchThreePujos, ...batchFourPujos];",
        "const rawPujos = [...batchOnePujos, ...batchTwoPujos, ...batchThreePujos, ...batchFourPujos, ...batchFivePujos];"
    );
    
    fs.writeFileSync('src/data/allPujos.js', code, 'utf8');
    console.log('Successfully added batch 5 to allPujos.js');
} else {
    console.log('Batch 5 already added.');
}
