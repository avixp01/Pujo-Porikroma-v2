import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Power } from 'lucide-react';
import SongListPopup, { mahalayaSongs } from './SongListPopup';
import './ThirdPagePlayer.css';

const thirdPagePlaylist = [
  { id: 'tp-1', title: 'Mahishasura Mardini', artist: 'Birendra Krishna Bhadra', duration: '89:13', src: '/songs/mahalaya.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/YQyo8QeoYhc?si=mW6kmE5iR4KgkCXb' },
  { id: 'tp-2', title: 'Bajlo Tomar Aalor Benu', artist: 'Birendra Krishna Bhadra', duration: '4:41', src: '/songs/bajlo-tomar-aalor-benu-with-narration.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/mnKcHhCOyT8?si=koCe3kqi0ZMZOyQb' },
  { id: 'tp-3', title: 'Chandipath', artist: 'Birendra Krishna Bhadra', duration: '12:15', src: '/songs/chandipath.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/S1Y3ohrjrsE?si=05MUFaXHqm2nwIvz' },
  { id: 'tp-4', title: 'Ya Chandi', artist: 'Chorus', duration: '1:57', src: '/songs/ya-chandi.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/8FytVk54-dw?si=HMnMsSLwQC7V7FfP' },
  { id: 'tp-5', title: 'Simhasta Sashishekhara', artist: 'Birendra Krishna Bhadra', duration: '0:57', src: '/songs/simhasta.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/UQHikCYHrx0?si=WWnpGBhwCN_stlJ-' },
  { id: 'tp-6', title: 'Ogo Amar Agamani', artist: 'Sipra Bose', duration: '3:41', src: '/songs/ogo-amar-agamani-alo.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/2RZZzJdzGPM?si=t3Wq3z8QOI6kKfOz' },
  { id: 'tp-7', title: 'Tabo Achinta Rupa', artist: 'Manabendra Mukherjee', duration: '4:25', src: '/songs/tabo-achinta-rupa.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/6rwF1iQPVzc?si=Yr2r5ILadF11986-' },
  { id: 'tp-8', title: 'Jago Durga Dashapraharanadharinee', artist: 'Dwijen Mukherjee', duration: '1:45', src: '/songs/jago-durga.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/IfSJy3_Lkuo?si=4j5ibIYVrE2UT0ud' },
  { id: 'tp-9', title: 'Dosh Karo Noy Go Ma', artist: 'Pannalal Bhattacharya', duration: '3:26', src: '/songs/dosh-karo-noy-go-ma.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/UpmsC0FAcf4?si=eKlMbR4el1UktR0g' },
  { id: 'tp-10', title: 'Arunkanti Ke Go Jogi', artist: 'Manabendra Mukherjee', duration: '3:00', src: '/songs/arunkanti.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/NOYokPXG2_I?si=emgZHZ-cqv3wyjmf' },
  { id: 'tp-11', title: 'Jaya Jaya Japya', artist: 'Chorus', duration: '2:32', src: '/songs/jaya-jaya-japya.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/AB4IUcvuEXs?si=Bfx96WVNOuiSXzRX' },
  { id: 'tp-12', title: 'Aham Rudrebhirvasubhischara', artist: 'Mahishasura Mardini', duration: '4:00', src: '/songs/aham-rudrebhirvasubhischara.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/nH65Xk8kPjQ?si=D7Fmf_mQhSh6nfZm' },
  { id: 'tp-13', title: 'Akhila-Bimane Taba Jaya-Gane', artist: 'Krishna Dasgupta', duration: '4:03', src: '/songs/akhila-bimane.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/FrHp3pXxeNU?si=X89Tb2eCO1cgBU1L' },
  { id: 'tp-14', title: 'Jayanti Mangala Kali', artist: 'Birendra Krishna Bhadra', duration: '7:10', src: '/songs/jayanti.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/Uwe7xGARrfA?si=iaFvky9jc1VTTe1O' },
  { id: 'tp-15', title: 'Subhra Sankha', artist: 'Shyamal Mitra', duration: '3:00', src: '/songs/subhra-sankha.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/R4LrXsy3Cgw?si=xnN2Xj7OUfa-u8OV' },
  { id: 'tp-16', title: 'Jatajutasamayuktamardhendukrita-Sekharam', artist: 'Mahishasura Mardini', duration: '4:26', src: '/songs/jatajutasamayuktamardhendukrita-sekharam.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/h5O3igngxCU?si=R2vk8lkkuVF78gED' },
  { id: 'tp-17', title: 'Ya Devi Sarbabhutesu', artist: 'Birendrakrishna Bhadra', duration: '5:12', src: '/songs/ya-devi-sarbabhutesu.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/RuJ_BPKdJpo?si=a6PZz2Z23PcoFX48' },
  { id: 'tp-18', title: 'Namo Chandi, Namo Chandi', artist: 'Bimal Bhushan', duration: '3:23', src: '/songs/namo-chandi.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/IlerrCPk_0Y?si=MMW98puaKpP6rAh-' },
  { id: 'tp-19', title: 'Ma Go Tabu Beene Sangeeta', artist: 'Sumitra Sen', duration: '3:40', src: '/songs/ma-go-tabu-beene.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/qdx842oMwnA?si=lBgHf4UjTIpzgRLp' },
  { id: 'tp-20', title: 'Bimane Bimane', artist: 'Sandhya Mukherjee', duration: '3:00', src: '/songs/bimane-bimane.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/-ZJtci1_Ih0?si=DGsiLbXhQTR-FGib' },
  { id: 'tp-21', title: 'He Chinmoyi', artist: 'Tarun Banerjee', duration: '3:12', src: '/songs/he-chinmoyi.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/zuVw7KFPQnk?si=6Z_bNj8SUGXgIsx6' },
  { id: 'tp-22', title: 'Santi Dile Bhari', artist: 'Utpala Sen', duration: '2:12', src: '/songs/santi-dile-bhari.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/VAV6OQMe-to?si=4vHJiuoqYlyDaeUx' },
  { id: 'tp-23', title: 'Aaha Ki Anando Akashe Batashy', artist: 'Hirak Rajar Deshe', duration: '7:08', src: '/songs/aaha-ki-anando.mp3', cover: '/3rdpageplaylistlogo.png', youtubeId: 'https://youtu.be/PIw4zEvlA1E?si=Dxe5UvAOBTsve8Qb' }
];

const extractYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

const ThirdPagePlayer = ({ playerId = 'third-page-mobile' }) => {
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastLoadedIdRef = useRef(null);
  const isChangingSongRef = useRef(false);
  const changingSongTimeoutRef = useRef(null);
  const songIndexRef = useRef(songIndex);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    songIndexRef.current = songIndex;
  }, [songIndex]);
  
  const currentSong = thirdPagePlaylist[songIndex];
  const currentYtId = extractYouTubeId(currentSong?.youtubeId);
  const [initialYtId] = useState(currentYtId || 'YQyo8QeoYhc');

  // Initialize YouTube Player
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const oldReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof oldReady === 'function') oldReady();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (!iframeRef.current || ytPlayerRef.current) return;
      ytPlayerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      });
    }

    function onPlayerReady(event) {
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
        setDuration(event.target.getDuration());
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        if (!isChangingSongRef.current) {
          setIsPlaying(false);
        }
      } else if (event.data === window.YT.PlayerState.ENDED) {
        if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
        if (!isChangingSongRef.current && isPlayingRef.current) {
          window.dispatchEvent(new CustomEvent(`tp-youtube-ended-${playerId}`));
        }
      }
    }

    function onPlayerError(event) {
      console.error("YouTube Player Error", event.data);
      if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
      isChangingSongRef.current = false;
      setIsPlaying(false);
    }
  }, []);

  // Listen to postMessage from YouTube iframe
  useEffect(() => {
    const handleMessage = (e) => {
      try {
        if (e.origin !== 'https://www.youtube.com') return;
        if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
        const data = JSON.parse(e.data);
        if (data.event === 'infoDelivery' && data.info) {
          if (!isDraggingRef.current) {
            if (data.info.currentTime !== undefined) setCurrentTime(data.info.currentTime);
            if (data.info.duration !== undefined && data.info.duration > 0) setDuration(data.info.duration);
          }
        }
        if ((data.event === 'onStateChange' && data.info === 0) ||
            (data.event === 'infoDelivery' && data.info && data.info.playerState === 0)) {
          if (!isChangingSongRef.current && isPlayingRef.current) {
            window.dispatchEvent(new CustomEvent(`tp-youtube-ended-${playerId}`));
          }
        }
      } catch(err) {}
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [playerId]);

  // Poll Time
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && !isDraggingRef.current && !isChangingSongRef.current && ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
        try {
          const t = ytPlayerRef.current.getCurrentTime();
          const d = ytPlayerRef.current.getDuration ? ytPlayerRef.current.getDuration() : duration;
          if (typeof t === 'number' && !isNaN(t) && t >= 0) {
            setCurrentTime(t);
            if (d > 0 && t >= d - 1 && isPlayingRef.current) {
              window.dispatchEvent(new CustomEvent(`tp-youtube-ended-${playerId}`));
            }
          }
          if (d > 0 && duration === 0) {
            setDuration(d);
          }
        } catch(e) {}
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration, playerId]);

  // Sync Video ID changes
  useEffect(() => {
    if (currentYtId && lastLoadedIdRef.current !== currentYtId) {
      if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
        if (isPlaying || isChangingSongRef.current) {
          ytPlayerRef.current.loadVideoById({ videoId: currentYtId });
          try { ytPlayerRef.current.playVideo(); } catch(e){}
        } else {
          ytPlayerRef.current.cueVideoById({ videoId: currentYtId });
        }
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        const func = (isPlaying || isChangingSongRef.current) ? 'loadVideoById' : 'cueVideoById';
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: [currentYtId, 0]
        }), '*');
        if (isPlaying || isChangingSongRef.current) {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }), '*');
        }
      }
      lastLoadedIdRef.current = currentYtId;
    }
  }, [currentYtId, isPlaying]);

  // Sync Play/Pause state to API
  useEffect(() => {
    if (isChangingSongRef.current) return;
    if (ytPlayerRef.current && ytPlayerRef.current.playVideo) {
      if (isPlaying) {
        ytPlayerRef.current.playVideo();
      } else {
        ytPlayerRef.current.pauseVideo();
      }
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isPlaying ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: []
      }), '*');
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      window.dispatchEvent(new CustomEvent('player-play', { detail: playerId }));
    }
  }, [isPlaying, playerId]);

  useEffect(() => {
    const handleGlobalPlay = (e) => {
      if (e.detail !== playerId) {
        setIsPlaying(false);
      }
    };
    window.addEventListener('player-play', handleGlobalPlay);
    return () => window.removeEventListener('player-play', handleGlobalPlay);
  }, [playerId]);

  useEffect(() => {
    const handleAutoPlay = () => {
      const isMobile = window.innerWidth <= 768;
      if ((isMobile && playerId === 'third-page-mobile') || (!isMobile && playerId === 'third-page-desktop')) {
        setSongIndex(0);
        setIsPlaying(true);
      }
    };
    window.addEventListener('mahalaya-auto-play', handleAutoPlay);
    return () => window.removeEventListener('mahalaya-auto-play', handleAutoPlay);
  }, [playerId]);

  const togglePlay = () => {
    if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
    isChangingSongRef.current = false;
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
    isChangingSongRef.current = true;
    changingSongTimeoutRef.current = setTimeout(() => {
      isChangingSongRef.current = false;
    }, 6000);

    const currentIdx = songIndexRef.current;
    const nextIdx = currentIdx === thirdPagePlaylist.length - 1 ? 0 : currentIdx + 1;
    songIndexRef.current = nextIdx;
    setSongIndex(nextIdx);
    setIsPlaying(true);
    setCurrentTime(0);
    
    const nextSong = thirdPagePlaylist[nextIdx];
    const nextYtId = extractYouTubeId(nextSong?.youtubeId);
    if (nextYtId) {
      if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
        ytPlayerRef.current.loadVideoById({ videoId: nextYtId });
        try { ytPlayerRef.current.playVideo(); } catch(e){}
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'loadVideoById',
          args: [nextYtId, 0]
        }), '*');
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }), '*');
      }
      lastLoadedIdRef.current = nextYtId;
    }
  };

  const handlePrev = () => {
    if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
    isChangingSongRef.current = true;
    changingSongTimeoutRef.current = setTimeout(() => {
      isChangingSongRef.current = false;
    }, 6000);

    const currentIdx = songIndexRef.current;
    const prevIdx = currentIdx === 0 ? thirdPagePlaylist.length - 1 : currentIdx - 1;
    songIndexRef.current = prevIdx;
    setSongIndex(prevIdx);
    setIsPlaying(true);
    setCurrentTime(0);
    
    const prevSong = thirdPagePlaylist[prevIdx];
    const prevYtId = extractYouTubeId(prevSong?.youtubeId);
    if (prevYtId) {
      if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
        ytPlayerRef.current.loadVideoById({ videoId: prevYtId });
        try { ytPlayerRef.current.playVideo(); } catch(e){}
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'loadVideoById',
          args: [prevYtId, 0]
        }), '*');
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }), '*');
      }
      lastLoadedIdRef.current = prevYtId;
    }
  };

  const lastEndedTimestampRef = useRef(0);
  useEffect(() => {
    const onEnded = () => {
      if (!isPlayingRef.current) return;
      const now = Date.now();
      if (now - lastEndedTimestampRef.current > 1500) {
        lastEndedTimestampRef.current = now;
        handleNext();
      }
    };
    window.addEventListener(`tp-youtube-ended-${playerId}`, onEnded);
    return () => window.removeEventListener(`tp-youtube-ended-${playerId}`, onEnded);
  }, [playerId]);

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (width > 0 && duration > 0) {
      const newTime = (clickX / width) * duration;
      setCurrentTime(newTime);
      if (ytPlayerRef.current && ytPlayerRef.current.seekTo) {
        ytPlayerRef.current.seekTo(newTime, true);
      } else if (iframeRef.current) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [newTime, true]
        }), '*');
      }
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSelectSong = (song) => {
    const index = thirdPagePlaylist.findIndex(s => s.src === song.src);
    if (index !== -1) {
      if (changingSongTimeoutRef.current) clearTimeout(changingSongTimeoutRef.current);
      isChangingSongRef.current = true;
      changingSongTimeoutRef.current = setTimeout(() => {
        isChangingSongRef.current = false;
      }, 6000);

      songIndexRef.current = index;
      setSongIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
      setShowPopup(false);
      
      const newYtId = extractYouTubeId(song.youtubeId);
      if (newYtId) {
        if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
          ytPlayerRef.current.loadVideoById({ videoId: newYtId });
          try { ytPlayerRef.current.playVideo(); } catch(e){}
        } else if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'loadVideoById',
            args: [newYtId, 0]
          }), '*');
          iframeRef.current.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }), '*');
        }
        lastLoadedIdRef.current = newYtId;
      }
    }
  };

  return (
    <>
      <div className="tp-player-wrapper">
        <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${initialYtId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&playsinline=1&controls=0`}
            title="YouTube audio player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{ position: 'absolute', zIndex: -1000, top: '-9999px', left: '-9999px', width: '200px', height: '200px', opacity: 1, visibility: 'visible' }}
          ></iframe>

        <div className="tp-css-radio">
          
          <div 
            className="tp-css-radio-speaker"
            onClick={() => setShowPopup(true)}
          >
            <div className="tp-css-radio-mesh"></div>
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className={`tp-css-radio-portrait ${isPlaying ? 'spinning' : ''}`} 
            />
          </div>

          <div className="tp-css-radio-right">
            
            <div className="tp-css-radio-display" style={{ '--progress': `${progressPercent}%` }} onClick={handleSeek}>
              <div className="tp-css-radio-track-title">{currentSong.title}</div>
              <div className="tp-css-radio-artist">{currentSong.artist}</div>
            </div>

            <div className="tp-css-radio-controls">
              <button className="tp-css-radio-btn" onClick={handlePrev} aria-label="Previous">
                <SkipBack size={16} color="#fff" />
              </button>
              <button className="tp-css-radio-btn tp-play-btn" onClick={togglePlay} aria-label="Play/Pause">
                <Power size={16} color={isPlaying ? "#4cd137" : "#fff"} strokeWidth={3} />
              </button>
              <button className="tp-css-radio-btn" onClick={handleNext} aria-label="Next">
                <SkipForward size={16} color="#fff" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {showPopup && (
        <div className="tp-popup-layer">
          <SongListPopup
            onClose={() => setShowPopup(false)}
            onSelectSong={handleSelectSong}
            currentSong={currentSong}
            pandalList={thirdPagePlaylist}
            favoriteList={favoriteSongs}
            customTitle="বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ"
            hideTabs={true}
            className="tp-glass-popup-overlay"
          />
        </div>
      )}
    </>
  );
};

export default ThirdPagePlayer;
