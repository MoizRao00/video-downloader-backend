const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function extractVideo(url) {
  if (url.includes('instagram.com')) {
    // Example logic (simplified)
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const videoUrl = $('meta[property="og:video"]').attr('content');
    return videoUrl;
  }

  // Add logic for TikTok, X, etc.
  return null;
};
