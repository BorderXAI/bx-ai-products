const express = require('express');
const router = express.Router();

// Shop data crawler endpoint
router.post('/crawl-shop', async (req, res) => {
  const { url, name } = req.body;
  console.log('Received crawl request for:', { url, name });

  if (!url || !name) {
    console.log('Missing required fields:', { url, name });
    return res.status(400).json({
      success: false,
      error: 'URL and name are required'
    });
  }

  try {
    // Validate URL
    if (!url.includes('fastmoss.com/shop-marketing/detail/')) {
      console.log('Invalid URL format:', url);
      throw new Error('Invalid Fastmoss shop URL');
    }

    // Since we can't use Puppeteer in WebContainer, we'll generate mock data
    console.log('Generating mock data for development...');
    const mockData = {
      followers: Math.floor(Math.random() * 500000) + 100000,
      totalGMV: Math.floor(Math.random() * 1000000) + 500000,
      liveGPM: Math.floor(Math.random() * 600) + 300,
      videoGPM: Math.floor(Math.random() * 500) + 250,
      unitsSold: Math.floor(Math.random() * 20000) + 5000,
      creators: Math.floor(Math.random() * 100) + 20,
      affiliateGMV: Math.floor(Math.random() * 300000) + 50000
    };

    console.log('Sending response with mock data:', mockData);
    res.json({
      success: true,
      data: {
        name,
        ...mockData,
        status: 'active'
      }
    });

  } catch (error) {
    console.error('Shop crawling error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process shop data'
    });
  }
});

module.exports = router;