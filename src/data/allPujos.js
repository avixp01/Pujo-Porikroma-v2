import { batchOnePujos } from './pujos-part1.js';
import { batchTwoPujos } from './pujos-part2.js';
import { batchThreePujos } from './pujos-part3.js';
import { batchFourPujos } from './pujos-part4.js';

const rawPujos = [...batchOnePujos, ...batchTwoPujos, ...batchThreePujos, ...batchFourPujos];

const uniquePujosMap = new Map();
rawPujos.forEach(pujo => {
    const cleanName = pujo.name.trim().toLowerCase();
    if (!uniquePujosMap.has(cleanName)) {
        uniquePujosMap.set(cleanName, pujo);
    }
});

export const allPujos = Array.from(uniquePujosMap.values());
