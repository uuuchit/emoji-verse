const express = require('express');
const router = express.Router();
const { EmojiPost } = require('../database');
const emojibase = require('emojibase');
const axios = require('axios');

// Create a new emoji post
router.post('/', async (req, res) => {
  try {
    const newPost = new EmojiPost(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all emoji posts
router.get('/', async (req, res) => {
  try {
    const posts = await EmojiPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single emoji post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await EmojiPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an emoji post by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await EmojiPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an emoji post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await EmojiPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Emoji search and autocomplete
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const results = emojibase.search(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AI-based emoji suggestions
router.post('/suggest', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Suggest emojis for the following text: ${text}`,
      max_tokens: 10,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const suggestions = response.data.choices[0].text.trim();
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
