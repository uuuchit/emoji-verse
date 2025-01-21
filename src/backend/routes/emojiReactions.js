const express = require('express');
const router = express.Router();
const { EmojiReaction } = require('../database');

// Create a new emoji reaction
router.post('/', async (req, res) => {
  try {
    const newReaction = new EmojiReaction(req.body);
    const savedReaction = await newReaction.save();
    res.status(201).json(savedReaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all emoji reactions
router.get('/', async (req, res) => {
  try {
    const reactions = await EmojiReaction.find();
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single emoji reaction by ID
router.get('/:id', async (req, res) => {
  try {
    const reaction = await EmojiReaction.findById(req.params.id);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json(reaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an emoji reaction by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedReaction = await EmojiReaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json(updatedReaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an emoji reaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedReaction = await EmojiReaction.findByIdAndDelete(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json({ message: 'Reaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
