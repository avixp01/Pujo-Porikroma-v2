const fs = require('fs');
let code = fs.readFileSync('src/components/MusicPlayer.jsx', 'utf8');

const stateRegex = /const \[currentSong, setCurrentSong\] = useState\(\{[\s\S]*?\}\);/;
const newState = `const [currentSong, setCurrentSong] = useState(pandalSongs[0]);`;

if (stateRegex.test(code)) {
    code = code.replace(stateRegex, newState);
    console.log('Replaced currentSong state!');
} else {
    console.log('Failed to match currentSong state!');
}

const initialYtIdRegex = /const \[initialYtId\] = useState\(\(\) => \{[\s\S]*?\}\);/;
const newInitialYtId = `const [initialYtId] = useState(() => extractYouTubeId(pandalSongs[0].youtubeId) || 'Q23V-K90f7Q');`;

if (initialYtIdRegex.test(code)) {
    code = code.replace(initialYtIdRegex, newInitialYtId);
    console.log('Replaced initialYtId!');
} else {
    // Maybe it's the old single line one?
    const oldInitialYtIdRegex = /const \[initialYtId\] = useState\(\(\) => extractYouTubeId\(pandalSongs\[0\]\.youtubeId\) \|\| 'Q23V-K90f7Q'\);/;
    if (oldInitialYtIdRegex.test(code)) {
        console.log('initialYtId is already correct format');
    } else {
        console.log('Failed to match initialYtId state!');
    }
}

fs.writeFileSync('src/components/MusicPlayer.jsx', code, 'utf8');
