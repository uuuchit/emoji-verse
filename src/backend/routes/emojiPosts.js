const express = require('express');
const router = express.Router();
const { EmojiPost } = require('../database');

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

module.exports = router;
