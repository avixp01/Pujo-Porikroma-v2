const fs = require('fs');
let code = fs.readFileSync('src/components/MusicPlayer.jsx', 'utf8');

code = code.replace(
  /<SongListPopup[\s\S]*?\/>/,
  `{showSongList && (
        <SongListPopup 
          onClose={() => setShowSongList(false)}
          currentSong={currentSong}
          onSelectSong={(song) => {
            setCurrentSong(song);
            setIsPlaying(true);
          }}
          pandalList={activePandalSongs}
          mahalayaList={activeMahalayaSongs}
          favoriteList={favoriteSongs}
          isFavoriteMode={isFavoriteMode}
        />
      )}`
);

fs.writeFileSync('src/components/MusicPlayer.jsx', code, 'utf8');
console.log('Fixed SongListPopup rendering');
