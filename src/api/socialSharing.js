const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint to share emoji post on Twitter
router.post('/share/twitter', async (req, res) => {
  const { postContent, twitterAccessToken } = req.body;

  try {
    const response = await axios.post(
      'https://api.twitter.com/2/tweets',
      { text: postContent },
      {
        headers: {
          Authorization: `Bearer ${twitterAccessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Post shared on Twitter', data: response.data });
  } catch (error) {
    console.error('Error sharing on Twitter: ', error);
    res.status(500).json({ message: 'Error sharing on Twitter', error: error.message });
  }
});

// Endpoint to share emoji post on Instagram
router.post('/share/instagram', async (req, res) => {
  const { postContent, instagramAccessToken } = req.body;

  try {
    const response = await axios.post(
      'https://graph.instagram.com/v12.0/me/media',
      {
        caption: postContent,
        access_token: instagramAccessToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Post shared on Instagram', data: response.data });
  } catch (error) {
    console.error('Error sharing on Instagram: ', error);
    res.status(500).json({ message: 'Error sharing on Instagram', error: error.message });
  }
});

module.exports = router;
