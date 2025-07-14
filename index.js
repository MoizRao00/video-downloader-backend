const express = require('express');
const cors = require('cors');
const extractVideo = require('./extractors/universal');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post('/extract', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  console.log('▶ Extracting:', url); // Debug log

  const videoUrl = await extractVideo(url);

  if (!videoUrl) {
    console.log('❌ Extraction failed');
    return res.status(404).json({ error: 'No video found' });
  }

  console.log('✅ Video found:', videoUrl);
  res.json({ videoUrl });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});