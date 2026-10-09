const fs = require("fs");
const lines = fs.readFileSync("pujo_addresses.txt", "utf8").split("\n");
const map = {};
lines.forEach(line => {
    line = line.trim();
    if (!line || !/^\d+\./.test(line)) return;
    const firstParen = line.indexOf("(");
    let name = "", addr = "";
    if (firstParen !== -1) {
        name = line.substring(line.indexOf(".") + 1, firstParen).trim();
        addr = line.substring(firstParen + 1).replace(/\)$/, "").trim();
    } else {
        name = line.substring(line.indexOf(".") + 1).trim();
    }
    
    if (name) {
        map[name.toLowerCase()] = addr;
    }
});

fs.writeFileSync("src/data/pujoAddresses.js", "export const pujoAddressMap = " + JSON.stringify(map, null, 2) + ";\n");
console.log("Parsed " + Object.keys(map).length + " addresses.");

