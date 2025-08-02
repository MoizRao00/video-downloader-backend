const express = require('express');
const cors = require('cors');
const extractVideo = require('./extractors/universal');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send('No URL provided');

  try {
    const { exec } = require('child_process');
    const fs = require('fs');

    const filename = `video_${Date.now()}.mp4`;
    const filePath = `/tmp/${filename}`;

    exec(`yt-dlp -o '${filePath}' '${url}'`, async (err, stdout, stderr) => {
      if (err) {
        console.error('yt-dlp ERROR:', err);
        console.error('stderr:', stderr);
        return res.status(500).json({ error: 'yt-dlp failed' });
      }

      console.log("✅ yt-dlp stdout:", stdout);
      console.log("✅ File downloaded at:", filePath);

      res.download(filePath, filename, (downloadErr) => {
        if (downloadErr) {
          console.error("❌ File download error:", downloadErr);
        }

        // Clean up (optional)
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.log("🧹 Cleanup error:", unlinkErr);
          else console.log("🧹 Temporary file deleted.");
        });
      });
    });

  } catch (e) {
    console.error("🔥 Server error in /download route:", e);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
