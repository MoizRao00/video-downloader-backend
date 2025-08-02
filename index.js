const express = require('express');
const cors = require('cors');
const extractVideo = require('./extractors/universal');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const videoUrl = await extractVideo(url);

    if (!videoUrl) {
      return res.status(404).json({ error: 'No video found' });
    }

    return res.status(200).json({ videoUrl });
  } catch (error) {
    console.error("🔥 Extraction error:", error);
    return res.status(500).json({ error: 'Server error during extraction' });
  }
});

app.get('/', (req, res) => {
  res.send("✅ Video Downloader Backend is Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
