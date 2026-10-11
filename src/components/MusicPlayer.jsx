import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Music, ChevronDown, Heart } from 'lucide-react';
import SongListPopup, { pandalSongs, mahalayaSongs } from './SongListPopup';
import './MusicPlayer.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSongList, setShowSongList] = useState(false);
  
  const [currentSong, setCurrentSong] = useState(pandalSongs[1]);
  
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastLoadedIdRef = useRef(null);
  const isChangingSongRef = useRef(false);
  const changingSongTimeoutRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const currentSongRef = useRef(currentSong);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentSongRef.current = currentSong;
  }, [currentSong]);
  
  const [initialYtId] = useState(() => extractYouTubeId(pandalSongs[1].youtubeId) || 'Q23V-K90f7Q');
  const currentYtId = extractYouTubeId(currentSong?.youtubeId);

  const [isDhakPlaying, setIsDhakPlaying] = useState(false);
  
  const dhakAudioRef = useRef(null);


  const [isRepeat, setIsRepeat] = useState(false);

  
  // Mutual exclusion hooks
  useEffect(() => {
    const handleGlobalPlay = (e) => {
      if (e.detail !== 'main-player') {
        setIsPlaying(false);
      }
    };
    window.addEventListener('player-play', handleGlobalPlay);
    return () => window.removeEventListener('player-play', handleGlobalPlay);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      window.dispatchEvent(new CustomEvent('player-play', { detail: 'main-player' }));
    }
  }, [isPlaying]);

  const playYtSong = (ytId) => {
    if (!ytId) return;
    lastLoadedIdRef.current = ytId;
    if (ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.unMute === 'function') ytPlayerRef.current.unMute();
        if (typeof ytPlayerRef.current.setVolume === 'function') ytPlayerRef.current.setVolume(100);
      } catch(e) {}
      try {
        if (typeof ytPlayerRef.current.loadVideoById === 'function') {
          ytPlayerRef.current.loadVideoById({ videoId: ytId, startSeconds: 0 });
        }
      } catch(e) {
        try { ytPlayerRef.current.loadVideoById(ytId, 0); } catch(e2) {}
      }
      try {
        if (typeof ytPlayerRef.current.playVideo === 'function') {
          ytPlayerRef.current.playVideo();
        }
      } catch(e) {}
    }
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const cw = iframeRef.current.contentWindow;
        cw.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
        cw.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
        cw.postMessage(JSON.stringify({ event: 'command', func: 'loadVideoById', args: [ytId, 0] }), '*');
        cw.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      } catch(e) {}
    }
  };

  const togglePlay = () => {
    if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
    isChangingSongRef.current = false;
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    if (nextIsPlaying) {
      if (currentYtId && lastLoadedIdRef.current !== currentYtId) {
        playYtSong(currentYtId);
      } else {
        if (ytPlayerRef.current) {
          try {
            if (typeof ytPlayerRef.current.unMute === 'function') ytPlayerRef.current.unMute();
            if (typeof ytPlayerRef.current.setVolume === 'function') ytPlayerRef.current.setVolume(100);
            if (typeof ytPlayerRef.current.playVideo === 'function') ytPlayerRef.current.playVideo();
          } catch(e) {}
        }
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            const cw = iframeRef.current.contentWindow;
            cw.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
            cw.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
            cw.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
          } catch(e) {}
        }
      }
    } else {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try { ytPlayerRef.current.pauseVideo(); } catch(e){}
      }
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
        } catch(e){}
      }
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const [isShuffled, setIsShuffled] = useState(false);
  const [activePandalSongs, setActivePandalSongs] = useState(pandalSongs);
  const [activeMahalayaSongs, setActiveMahalayaSongs] = useState(mahalayaSongs);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isFavoriteMode, setIsFavoriteMode] = useState(false);

  const toggleFavoriteCurrent = () => {
    setFavoriteSongs(prev => {
      const exists = prev.find(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
      if (exists) {
        return prev.filter(s => (s.src && s.src !== currentSong.src) && (s.youtubeId !== currentSong.youtubeId));
      }
      return [...prev, currentSong];
    });
  };

  const toggleShuffle = () => {
    if (!isShuffled) {
      const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
      };
      setActivePandalSongs(shuffleArray(pandalSongs));
      setActiveMahalayaSongs(shuffleArray(mahalayaSongs));
      setIsShuffled(true);
    } else {
      setActivePandalSongs(pandalSongs);
      setActiveMahalayaSongs(mahalayaSongs);
      setIsShuffled(false);
    }
  };

  const toggleDhak = () => {
    setIsDhakPlaying(!isDhakPlaying);
  };

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.view !== 'music-main' && e.state?.view !== 'music-search' && e.state?.view !== 'music-popup') {
        setShowSongList(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    if (window.history.state?.view !== 'music-main' && window.history.state?.view !== 'music-search' && window.history.state?.view !== 'music-popup') {
      setShowSongList(false);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openSongList = (isFavorite) => {
    setIsFavoriteMode(isFavorite);
    window.history.pushState({ view: 'music-main' }, '');
    setShowSongList(true);
  };

  const closeSongList = () => {
    if (window.history.state?.view === 'music-search' || window.history.state?.view === 'music-popup') {
      window.history.go(-2);
    } else if (window.history.state?.view === 'music-main') {
      window.history.back();
    } else {
      setShowSongList(false);
    }
  };

  const handleSelectSong = (song) => {
    if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
    isChangingSongRef.current = true;
    changingSongTimeoutRef.current = setTimeout(() => {
      isChangingSongRef.current = false;
    }, 2000);

    setCurrentSong(song);
    currentSongRef.current = song;
    setDuration(0); // Reset duration immediately
    setCurrentTime(0);
    closeSongList();
    setIsPlaying(true);
    const selectYtId = extractYouTubeId(song.youtubeId);
    if (selectYtId) {
      playYtSong(selectYtId);
    }
  };

  const playNext = () => {
    let nextSong = null;
    const favIndex = favoriteSongs.findIndex(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
    if (isFavoriteMode && favIndex !== -1) {
      nextSong = favoriteSongs[(favIndex + 1) % favoriteSongs.length];
    } else {
      const pandalIndex = activePandalSongs.findIndex(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
      if (pandalIndex !== -1) {
        nextSong = activePandalSongs[(pandalIndex + 1) % activePandalSongs.length];
      } else {
        const mahalayaIndex = activeMahalayaSongs.findIndex(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
        if (mahalayaIndex !== -1) {
          nextSong = activeMahalayaSongs[(mahalayaIndex + 1) % activeMahalayaSongs.length];
        }
      }
    }
    if (nextSong) {
      if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
      isChangingSongRef.current = true;
      changingSongTimeoutRef.current = setTimeout(() => {
        isChangingSongRef.current = false;
      }, 2000);

      setCurrentSong(nextSong);
      currentSongRef.current = nextSong;
      setDuration(0); setCurrentTime(0);
      setIsPlaying(true);
      const nextYtId = extractYouTubeId(nextSong.youtubeId);
      if (nextYtId) {
        playYtSong(nextYtId);
      }
    }
  };

  const playPrevious = () => {
    let prevSong = null;
    const favIndex = favoriteSongs.findIndex(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
    if (isFavoriteMode && favIndex !== -1) {
      prevSong = favoriteSongs[(favIndex - 1 + favoriteSongs.length) % favoriteSongs.length];
    } else {
      const pandalIndex = activePandalSongs.findIndex(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
      if (pandalIndex !== -1) {
        prevSong = activePandalSongs[(pandalIndex - 1 + activePandalSongs.length) % activePandalSongs.length];
      } else {
        const mahalayaIndex = activeMahalayaSongs.findIndex(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId));
        if (mahalayaIndex !== -1) {
          prevSong = activeMahalayaSongs[(mahalayaIndex - 1 + activeMahalayaSongs.length) % activeMahalayaSongs.length];
        }
      }
    }
    if (prevSong) {
      if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
      isChangingSongRef.current = true;
      changingSongTimeoutRef.current = setTimeout(() => {
        isChangingSongRef.current = false;
      }, 2000);

      setCurrentSong(prevSong);
      currentSongRef.current = prevSong;
      setDuration(0); setCurrentTime(0);
      setIsPlaying(true);
      const prevYtId = extractYouTubeId(prevSong.youtubeId);
      if (prevYtId) {
        playYtSong(prevYtId);
      }
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
        ytPlayerRef.current.seekTo(0, true);
        ytPlayerRef.current.playVideo();
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }), '*');
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      }
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }
    
    const activeSong = currentSongRef.current || currentSong;
    let nextSong = null;
    const favIndex = favoriteSongs.findIndex(s => (s.src && s.src === activeSong.src) || (s.youtubeId && s.youtubeId === activeSong.youtubeId));
    if (isFavoriteMode && favIndex !== -1) {
      nextSong = favoriteSongs[(favIndex + 1) % favoriteSongs.length];
    } else {
      const pandalIndex = activePandalSongs.findIndex(s => (s.src && s.src === activeSong.src) || (s.youtubeId && s.youtubeId === activeSong.youtubeId));
      if (pandalIndex !== -1) {
        nextSong = activePandalSongs[(pandalIndex + 1) % activePandalSongs.length];
      } else {
        const mahalayaIndex = activeMahalayaSongs.findIndex(s => (s.src && s.src === activeSong.src) || (s.youtubeId && s.youtubeId === activeSong.youtubeId));
        if (mahalayaIndex !== -1) {
          nextSong = activeMahalayaSongs[(mahalayaIndex + 1) % activeMahalayaSongs.length];
        }
      }
    }
    
    if (!nextSong && activePandalSongs.length > 0) {
      nextSong = activePandalSongs[0];
    }

    if (nextSong) {
      if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
      isChangingSongRef.current = true;
      changingSongTimeoutRef.current = setTimeout(() => {
        isChangingSongRef.current = false;
      }, 2000);

      setCurrentSong(nextSong);
      currentSongRef.current = nextSong;
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(true);
      const nextYtId = extractYouTubeId(nextSong.youtubeId);
      if (nextYtId) {
        playYtSong(nextYtId);
      }
    }
  };

  const handleEndedRef = useRef(handleEnded);
  const lastEndedTimestampRef = useRef(0);

  useEffect(() => {
    handleEndedRef.current = handleEnded;
  });

  const triggerEnded = () => {
    if (!isPlayingRef.current) return;
    const now = Date.now();
    if (now - lastEndedTimestampRef.current > 1500) {
      lastEndedTimestampRef.current = now;
      if (handleEndedRef.current) {
        handleEndedRef.current();
      }
    }
  };

  useEffect(() => {
    const onEndedListener = () => {
      triggerEnded();
    };
    window.addEventListener('mp-youtube-ended', onEndedListener);
    return () => window.removeEventListener('mp-youtube-ended', onEndedListener);
  }, []);

  const playerStateRef = useRef({ isRepeat: false, playNext: () => {} });

  const durationFallbackRef = useRef(150);
  useEffect(() => {
    playerStateRef.current = { isRepeat, playNext: handleEnded };
  }, [isRepeat, handleEnded]);

  // Initialize YT API
  useEffect(() => {
    let checkInterval = null;

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
           firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
           document.head.appendChild(tag);
        }
      }
      
      const oldReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof oldReady === 'function') oldReady();
        initPlayer();
      };

      // Periodic check ensures initPlayer is called as soon as YT.Player exists,
      // even if onYouTubeIframeAPIReady was clobbered by any other component
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          if (!ytPlayerRef.current) {
            initPlayer();
          } else {
            clearInterval(checkInterval);
            checkInterval = null;
          }
        }
      }, 100);
    }

    function initPlayer() {
      if (!iframeRef.current || ytPlayerRef.current) return;
      try {
        ytPlayerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
          }
        });
      } catch (err) {
        console.error("YT Player init error in MusicPlayer:", err);
      }
    }

    function onPlayerReady(event) {
      if (event && event.target) {
        ytPlayerRef.current = event.target;
      }
      try {
        if (event.target.unMute) event.target.unMute();
        if (event.target.setVolume) event.target.setVolume(100);
      } catch(e) {}
      if (currentYtId) {
        event.target.cueVideoById(currentYtId);
        lastLoadedIdRef.current = currentYtId;
      }
      if (isPlaying) {
        event.target.playVideo();
      }
    }

    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.PLAYING) {
        if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
        isChangingSongRef.current = false;
        setIsPlaying(true);
        try {
          const d = event.target.getDuration();
          if (d > 0) setDuration(d);
        } catch(e) {}
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        if (!isChangingSongRef.current) {
          setIsPlaying(false);
        }
      } else if (event.data === window.YT.PlayerState.ENDED) {
        if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
        if (!isChangingSongRef.current) {
          window.dispatchEvent(new CustomEvent('mp-youtube-ended'));
        }
      }
    }

    function onPlayerError(event) {
      console.error("YouTube Player Error", event.data);
      if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
      isChangingSongRef.current = false;
      setIsPlaying(false);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  // Sync play/pause state
  useEffect(() => {
    if (isChangingSongRef.current) return;
    if (isPlaying) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        try {
          if (typeof ytPlayerRef.current.unMute === 'function') ytPlayerRef.current.unMute();
          if (typeof ytPlayerRef.current.setVolume === 'function') ytPlayerRef.current.setVolume(100);
          ytPlayerRef.current.playVideo();
        } catch(e){}
      }
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          const cw = iframeRef.current.contentWindow;
          cw.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
          cw.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
          cw.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
        } catch(e) {}
      }
    } else {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try { ytPlayerRef.current.pauseVideo(); } catch(e){}
      }
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
        } catch(e) {}
      }
    }
  }, [isPlaying]);

  // Handle song change
  useEffect(() => {
    if (currentYtId && currentYtId !== lastLoadedIdRef.current) {
      setDuration(0);
      setCurrentTime(0);
      if (isPlaying || isChangingSongRef.current) {
        playYtSong(currentYtId);
      } else {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.cueVideoById === 'function') {
          try { ytPlayerRef.current.cueVideoById({ videoId: currentYtId }); } catch(e) {
            try { ytPlayerRef.current.cueVideoById(currentYtId); } catch(e2){}
          }
        }
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'cueVideoById', args: [currentYtId, 0] }), '*');
          } catch(e){}
        }
        lastLoadedIdRef.current = currentYtId;
      }
    }
  }, [currentYtId, isPlaying]);

  useEffect(() => {
    const handleMessage = (e) => {
      try {
        if (e.origin !== 'https://www.youtube.com') return;
        if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
        if (isChangingSongRef.current) return;
        const data = JSON.parse(e.data);
        if (data.event === 'infoDelivery' && data.info) {
          if (!isDraggingRef.current) {
            if (data.info.currentTime !== undefined) {
              const msgTime = data.info.currentTime;
              const maxDuration = durationFallbackRef.current || 0;
              if (maxDuration > 0 && msgTime > maxDuration + 2) {
                return;
              }
              setCurrentTime(msgTime);
            }
            if (data.info.duration !== undefined && data.info.duration > 0 && !currentSong?.duration) {
              setDuration(data.info.duration);
            }
          }
        }
        if ((data.event === 'onStateChange' && data.info === 0) ||
            (data.event === 'infoDelivery' && data.info && data.info.playerState === 0)) {
          if (!isChangingSongRef.current && isPlayingRef.current) {
            window.dispatchEvent(new CustomEvent('mp-youtube-ended'));
          }
        }
      } catch(err) {}
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Poll current time safely and advance progress automatically
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && !isDraggingRef.current && !isChangingSongRef.current) {
        let gotTime = false;
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          try {
            const ytTime = ytPlayerRef.current.getCurrentTime();
            const maxDuration = durationFallbackRef.current || 0;
            if (typeof ytTime === 'number' && !isNaN(ytTime) && ytTime >= 0) {
              if (maxDuration > 0 && ytTime > maxDuration + 2) {
                // Ignore stale time from a previously played longer track
              } else {
                setCurrentTime(ytTime);
                gotTime = true;
                if (isPlayingRef.current && maxDuration > 0 && ytTime >= maxDuration - 1 && !isChangingSongRef.current) {
                  window.dispatchEvent(new CustomEvent('mp-youtube-ended'));
                }
              }
            }
            const ytDuration = ytPlayerRef.current.getDuration ? ytPlayerRef.current.getDuration() : 0;
            if (ytDuration > 0 && !currentSong?.duration) setDuration(ytDuration);
          } catch(e) {}
        }

        // Reliable progress fallback ticker if YouTube API time is temporarily buffering or unavailable
        if (!gotTime) {
          const maxDuration = durationFallbackRef.current || 0;
          setCurrentTime(prev => {
            const next = prev + 1;
            if (maxDuration > 0 && next >= maxDuration - 1 && isPlayingRef.current && !isChangingSongRef.current) {
              window.dispatchEvent(new CustomEvent('mp-youtube-ended'));
            }
            return maxDuration > 0 ? Math.min(next, maxDuration) : next;
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentYtId]);

  useEffect(() => {
    if (dhakAudioRef.current) {
      if (isDhakPlaying) {
        dhakAudioRef.current.play().catch(e => console.log(e));
      } else {
        dhakAudioRef.current.pause();
      }
    }
  }, [isDhakPlaying]);

  const formatTime = (time) => {
    if (isNaN(time) || !time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const actualDuration = currentSong?.duration ? (parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1])) : (duration > 0 ? duration : 100);
  useEffect(() => { if (durationFallbackRef) durationFallbackRef.current = actualDuration; }, [actualDuration]);
  const displayCurrentTime = actualDuration > 0 ? Math.min(currentTime, actualDuration) : currentTime;
  const progress = actualDuration ? Math.min(100, Math.max(0, (displayCurrentTime / actualDuration) * 100)) : 0;

  return (
    <div className="music-player-container">
      <audio ref={dhakAudioRef} src="/songs/dhak-song.webm" loop preload="auto" />

      {/* NATIVE YOUTUBE IFRAME */}
      <ErrorBoundary>
        <div style={{ position: 'fixed', zIndex: -1000, top: '0px', left: '0px', width: '200px', height: '200px', opacity: 0.001, pointerEvents: 'none' }}>
          <iframe
            ref={iframeRef}
            id="youtube-native-player"
            width="200"
            height="200"
            src={`https://www.youtube.com/embed/${initialYtId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&playsinline=1&controls=0`}
            title="Music Player YouTube native"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </ErrorBoundary>

      {/* Mobile only selector */}
      <div className="mobile-category-selector show-mobile-flex" style={{ gap: '12px' }}>
        <button className="category-btn glass-panel bengali-text" onClick={() => openSongList(false)}>
          <Music size={16} />
          পুজো সংগ্রহ
          <ChevronDown size={16} />
        </button>
        <button 
          className="category-btn glass-panel" 
          onClick={() => openSongList(true)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}
          title="My Favorite Playlist"
        >
          <Heart size={18} fill="none" />
        </button>
      </div>

      <div className="music-player glass-panel">
        <div className="player-top">
          <div className="track-info">
            <div className={`album-art ${isPlaying ? 'playing' : ''}`}>
              <img src={currentSong.cover} alt={currentSong.title} />
            </div>
            <div className="track-details" style={{ position: 'relative', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div className="track-title">{currentSong.title}</div>
                  <div className="track-artist">{currentSong.artist}</div>
                </div>
                <button 
                  onClick={toggleFavoriteCurrent} 
                  style={{ background: 'transparent', border: 'none', color: favoriteSongs.some(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId)) ? '#ff4b4b' : 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, marginTop: '2px', transform: 'translateY(-1px)' }}
                >
                  <Heart size={18} fill={favoriteSongs.some(s => (s.src && s.src === currentSong.src) || (s.youtubeId && s.youtubeId === currentSong.youtubeId)) ? '#ff4b4b' : 'none'} />
                </button>
              </div>
              <div className="track-time">{formatTime(displayCurrentTime)} / {formatTime(actualDuration)}</div>
            </div>
          </div>
          
          <div className="player-controls">
            <button className="control-btn" onClick={playPrevious}><SkipBack size={12} fill="currentColor" /></button>
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="play-icon-offset" />}
            </button>
            <button className="control-btn" onClick={playNext}><SkipForward size={12} fill="currentColor" /></button>
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <input 
              type="range" 
              min="0" 
              max={actualDuration || 100} 
              step="0.1"
              value={Math.min(displayCurrentTime, actualDuration || 100) || 0}
              className="progress-input"
              onMouseDown={() => {
                isDraggingRef.current = true;
              }}
              onTouchStart={() => {
                isDraggingRef.current = true;
              }}
              onChange={(e) => {
                isDraggingRef.current = true;
                setCurrentTime(parseFloat(e.target.value));
              }}
              onMouseUp={(e) => {
                const newTime = parseFloat(e.target.value);
                setCurrentTime(newTime);
                if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
                  ytPlayerRef.current.seekTo(newTime, true);
                } else if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [newTime, true] }), '*');
                }
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 400);
              }}
              onTouchEnd={(e) => {
                const newTime = parseFloat(e.target.value);
                setCurrentTime(newTime);
                if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
                  ytPlayerRef.current.seekTo(newTime, true);
                } else if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [newTime, true] }), '*');
                }
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 400);
              }}
            />
        </div>
        
        <div className="player-bottom show-mobile-flex">
          <button 
            className={`action-btn bengali-text ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
            style={{ color: isShuffled ? '#ffffff' : '' }}
          >
            <Shuffle size={16} />
            <span style={{ position: 'relative', top: '2px' }}>এলোমেলো</span>
          </button>
          <div className="divider"></div>
          <button 
            className={`action-btn bengali-text ${isRepeat ? 'active' : ''}`}
            onClick={toggleRepeat}
            style={{ color: isRepeat ? '#ffffff' : '' }}
          >
            <Repeat size={16} />
            <span style={{ position: 'relative', top: '2px' }}>পুনরাবৃত্তি</span>
          </button>
          <div className="divider"></div>
          <button 
            className={`action-btn bengali-text ${isDhakPlaying ? 'active' : ''}`}
            onClick={toggleDhak}
            style={{ color: isDhakPlaying ? '#ffffff' : '' }}
          >
            <Music size={16} />
            <span style={{ position: 'relative', top: '2px' }}>ঢাক</span>
          </button>
        </div>
      </div>

      {showSongList && <SongListPopup onClose={closeSongList} onSelectSong={handleSelectSong} currentSong={currentSong} pandalList={activePandalSongs} mahalayaList={activeMahalayaSongs} favoriteList={favoriteSongs} isFavoriteMode={isFavoriteMode} />}
    </div>
  );
};

export default MusicPlayer;
