const express = require('express');
const cors = require('cors');
const extractVideo = require('./extractors/universal');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send('No URL provided');

  try {
    const { exec } = require('child_process');

    // Create temp file name
    const filename = `video_${Date.now()}.mp4`;
    const filePath = `/tmp/${filename}`; // or use /app/ if on Railway

    exec(`yt-dlp -o '${filePath}' '${url}'`, async (err, stdout, stderr) => {
      if (err) {
        console.error('yt-dlp ERROR:', stderr);
        return res.status(500).json({ error: 'yt-dlp failed to download the video' });
      }

     res.download(filePath, filename, (downloadErr) => {
  if (downloadErr) {
    console.error("Download error:", downloadErr);
  }

  fs.unlink(filePath, (unlinkErr) => {
    if (unlinkErr) console.error("File cleanup failed:", unlinkErr);
  });
});
  } catch (e) {
    console.error("Server error:", e);
    res.status(500).send("Server error");
  }
});