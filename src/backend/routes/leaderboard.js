const express = require('express');
const router = express.Router();
const { Leaderboard } = require('../database');

// Create a new leaderboard entry
router.post('/', async (req, res) => {
  try {
    const newEntry = new Leaderboard(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all leaderboard entries
router.get('/', async (req, res) => {
  try {
    const entries = await Leaderboard.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single leaderboard entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a leaderboard entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a leaderboard entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get leaderboard entries by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const entries = await Leaderboard.find({ category });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
