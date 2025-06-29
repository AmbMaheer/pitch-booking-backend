const express = require('express');
const Pitch = require('../models/pitch_temp');

const router = express.Router();

// GET all pitches
router.get('/', async (req, res) => {
  try {
    const pitches = await Pitch.find();
    res.json(pitches);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new pitch
router.post('/', async (req, res) => {
  try {
    const { name, location, description } = req.body;

    const newPitch = new Pitch({
      name,
      location,
      description,
      available: true // Default availability
    });

    await newPitch.save();
    res.status(201).json(newPitch);
  } catch (err) {
    res.status(500).json({ message: 'Error creating pitch' });
  }
});

// PUT to update pitch availability
router.put('/:id/availability', async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.id);
    if (!pitch) return res.status(404).json({ message: 'Pitch not found' });

    // Important: Match schema key `available`, not `isAvailable`
    pitch.available = req.body.available;
    await pitch.save();

    res.json(pitch);
  } catch (err) {
    res.status(500).json({ message: 'Error updating pitch availability' });
  }
});

module.exports = router;


