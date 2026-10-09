const fs = require("fs");
const path = "src/components/MapPage.jsx";
let content = fs.readFileSync(path, "utf8");

const oldStr = "{selectedLocation?.address || \x27Ballygunge Place, Ballygunge\x27}";
const newStr = "{selectedLocation?.type === \x27toilet\x27 ? \x27Toilet\x27 : selectedLocation?.type === \x27metro\x27 ? \x27Metro\x27 : selectedLocation?.type === \x27train\x27 ? \x27Train\x27 : (selectedLocation?.address || \x27Ballygunge Place, Ballygunge\x27)}";

let count = 0;
content = content.replace(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), () => {
    count++;
    return newStr;
});

fs.writeFileSync(path, content, "utf8");
console.log("Replaced " + count + " instances.");

