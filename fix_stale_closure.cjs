const fs = require('fs');
let code = fs.readFileSync('src/components/MusicPlayer.jsx', 'utf8');

const refInjection = `
  const dhakAudioRef = useRef(null);

  // Add state ref to fix YouTube event closure bugs
  const playerStateRef = useRef({ isRepeat: false, playNext: () => {} });
  useEffect(() => {
    playerStateRef.current = { isRepeat, playNext };
  }, [isRepeat, playNext]);
`;
code = code.replace(/const dhakAudioRef = useRef\(null\);/, refInjection);

const stateChangeReplacement = `
    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        setDuration(event.target.getDuration());
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
      } else if (event.data === window.YT.PlayerState.ENDED) {
        if (playerStateRef.current.isRepeat) {
          if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
            ytPlayerRef.current.seekTo(0, true);
          }
          setIsPlaying(true);
        } else {
          playerStateRef.current.playNext();
        }
      }
    }
`;
code = code.replace(/function onPlayerStateChange\(event\) \{[\s\S]*?\}\s*\}/, stateChangeReplacement.trim());

fs.writeFileSync('src/components/MusicPlayer.jsx', code, 'utf8');
console.log('Fixed stale closure bug in YouTube API event listener!');
