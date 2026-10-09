const fs = require('fs');

const diff = fs.readFileSync('diff.txt', 'utf8');

// Find the bad hunk
const badHunkStart = "@@ -113,631 +114,43 @@";
const badIndex = diff.indexOf(badHunkStart);

if (badIndex !== -1) {
    // Find the next hunk
    const nextHunkIndex = diff.indexOf("@@", badIndex + badHunkStart.length);
    
    let goodDiff = diff.substring(0, badIndex);
    if (nextHunkIndex !== -1) {
        goodDiff += diff.substring(nextHunkIndex);
    }
    
    // Fix line endings just in case Git apply complains
    // goodDiff = goodDiff.replace(/\r\n/g, '\n');
    
    fs.writeFileSync('good_diff.patch', goodDiff, 'utf8');
    console.log("Successfully created good_diff.patch");
} else {
    console.log("Could not find bad hunk!");
}
