const duration = 0;
const currentSong = { title: 'Dugga Elo', duration: undefined };
const actualDuration = duration > 0 ? duration : (currentSong?.duration ? (parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1])) : 100);
console.log('actualDuration:', actualDuration);

const formatTime = (time) => {
  if (isNaN(time) || !time) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
console.log('formatTime:', formatTime(actualDuration));
