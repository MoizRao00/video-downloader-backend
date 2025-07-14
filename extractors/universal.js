const { exec } = require('child_process');

module.exports = async function extractVideo(url) {
  return new Promise((resolve) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return resolve(null); // YouTube not allowed
    }

    // ✅ Correct and single exec block
    exec(`yt-dlp -f mp4 -g "${url}"`, (err, stdout, stderr) => {
      console.log("▶️ yt-dlp stdout:", stdout);
      console.log("⚠️ yt-dlp stderr:", stderr);

      if (err || !stdout) {
        console.error('❌ yt-dlp error:', stderr || err.message);
        return resolve(null);
      }

      const videoUrl = stdout.trim();
      resolve(videoUrl);
    });
  });
};