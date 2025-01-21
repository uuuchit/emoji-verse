const express = require('express');
const router = express.Router();
const { CustomEmojiPack } = require('../database');

// Create a new custom emoji pack
router.post('/', async (req, res) => {
  try {
    const newPack = new CustomEmojiPack(req.body);
    const savedPack = await newPack.save();
    res.status(201).json(savedPack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all custom emoji packs
router.get('/', async (req, res) => {
  try {
    const packs = await CustomEmojiPack.find();
    res.status(200).json(packs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single custom emoji pack by ID
router.get('/:id', async (req, res) => {
  try {
    const pack = await CustomEmojiPack.findById(req.params.id);
    if (!pack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    res.status(200).json(pack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a custom emoji pack by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPack = await CustomEmojiPack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    res.status(200).json(updatedPack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a custom emoji pack by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPack = await CustomEmojiPack.findByIdAndDelete(req.params.id);
    if (!deletedPack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    res.status(200).json({ message: 'Pack deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
