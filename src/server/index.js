const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Video recommendations endpoint
app.post('/api/recommendations/daily', async (req, res) => {
  try {
    const { category, style_tags } = req.body;

    // Mock response for development
    const recommendations = [
      {
        id: '1',
        title: 'Morning Skincare Routine 2024',
        creator: '@beautyexpert',
        views: '1.2M',
        likes: '245K',
        comments: '3.2K',
        shares: '15K',
        duration: '0:45',
        category: 'Beauty & Skincare',
        similarityScore: 92,
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600',
        keyTakeaways: [
          'Quick, engaging transitions',
          'Product close-ups with text overlays',
          'Natural lighting techniques'
        ]
      },
      // Add more mock recommendations
    ];

    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});