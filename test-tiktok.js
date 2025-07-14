const extractTiktok = require('./extractors/tiktok');

(async () => {
  const url = 'https://www.tiktok.com/@islamic.status.muslim/video/7516065735395822870';
  const videoUrl = await extractTiktok(url);
  console.log('📹 Direct Video URL:', videoUrl);
})();