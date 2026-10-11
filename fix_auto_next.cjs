const fs = require('fs');
let code = fs.readFileSync('src/components/MusicPlayer.jsx', 'utf8');

// 1. Update playerStateRef to include actualDuration
const oldRef = /const playerStateRef = useRef\(\{ isRepeat: false, playNext: \(\) => \{\} \}\);\s*useEffect\(\(\) => \{\s*playerStateRef\.current = \{ isRepeat, playNext \};\s*\}, \[isRepeat, playNext\]\);/;
const newRef = `const playerStateRef = useRef({ isRepeat: false, playNext: () => {}, actualDuration: 150 });
    useEffect(() => {
      playerStateRef.current = { isRepeat, playNext, actualDuration };
    }, [isRepeat, playNext, actualDuration]);`;
if (code.match(oldRef)) {
    code = code.replace(oldRef, newRef);
} else {
    // Maybe actualDuration isn't defined yet? 
    // actualDuration is defined further down. We need to define actualDuration BEFORE playerStateRef!
    console.log('Regex oldRef failed to match, will use injection...');
}

// Better approach: just inject the check inside the setInterval directly by reading currentSong duration!
// Wait, currentSong inside setInterval is stale!
// So let's use a new ref: durationFallbackRef
const stateBlock = /const \[currentSong, setCurrentSong\] = useState\(pandalSongs\[1\]\);/;
const newStateBlock = `const [currentSong, setCurrentSong] = useState(pandalSongs[1]);
    const durationFallbackRef = useRef(150);`;
code = code.replace(stateBlock, newStateBlock);

const actualDurationBlock = /const actualDuration = duration > 0 \? duration : \(currentSong\?\.duration \? \(parseInt\(currentSong\.duration\.split\(':'\)\[0\]\) \* 60 \+ parseInt\(currentSong\.duration\.split\(':'\)\[1\]\)\) : 100\);/;
const newActualDurationBlock = `const actualDuration = duration > 0 ? duration : (currentSong?.duration ? (parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1])) : 100);
    useEffect(() => { durationFallbackRef.current = actualDuration; }, [actualDuration]);`;
code = code.replace(actualDurationBlock, newActualDurationBlock);

const intervalLogic = /if \(ytPlayerRef\.current && typeof ytPlayerRef\.current\.getCurrentTime === 'function'\) \{\s*const ytTime = ytPlayerRef\.current\.getCurrentTime\(\);\s*if \(ytTime > 0\) setCurrentTime\(ytTime\);\s*else setCurrentTime\(prev => prev \+ 1\);\s*const ytDuration = ytPlayerRef\.current\.getDuration \? ytPlayerRef\.current\.getDuration\(\) : 0;\s*if \(ytDuration > 0 && !currentSong\?\.duration\) setDuration\(ytDuration\);\s*\} else \{\s*setCurrentTime\(prev => prev \+ 1\);\s*\}/;

const newIntervalLogic = `if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
               const ytTime = ytPlayerRef.current.getCurrentTime();
               let nextTime = ytTime > 0 ? ytTime : null;
               
               if (nextTime !== null) {
                   setCurrentTime(nextTime);
               } else {
                   setCurrentTime(prev => { nextTime = prev + 1; return nextTime; });
               }

               if (nextTime && nextTime >= durationFallbackRef.current - 1 && durationFallbackRef.current > 0) {
                   if (playerStateRef.current.isRepeat) {
                       if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') ytPlayerRef.current.seekTo(0, true);
                       setCurrentTime(0);
                   } else {
                       playerStateRef.current.playNext();
                   }
               }
               
               const ytDuration = ytPlayerRef.current.getDuration ? ytPlayerRef.current.getDuration() : 0;
               if (ytDuration > 0 && !currentSong?.duration) setDuration(ytDuration);
            } else {
               setCurrentTime(prev => {
                   const nextTime = prev + 1;
                   if (nextTime >= durationFallbackRef.current - 1 && durationFallbackRef.current > 0) {
                       if (playerStateRef.current.isRepeat) setCurrentTime(0);
                       else playerStateRef.current.playNext();
                       return 0;
                   }
                   return nextTime;
               });
            }`;

if (code.match(intervalLogic)) {
    code = code.replace(intervalLogic, newIntervalLogic);
    fs.writeFileSync('src/components/MusicPlayer.jsx', code, 'utf8');
    console.log('Successfully patched playNext polling logic!');
} else {
    console.log('Could not match intervalLogic!');
}
