const express = require('express');
const Booking = require('../models/booking');
const Pitch = require('../models/Pitch');
const router = express.Router();

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('pitch');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Filter bookings by date and/or pitch name
router.get('/filter', async (req, res) => {
  try {
    const { date, pitchName } = req.query;

    const filter = {};
    if (date) {
      filter.date = new Date(date);
    }

    if (pitchName) {
      // First find the pitch ID by name
      const pitch = await Pitch.findOne({ name: pitchName });
      if (!pitch) {
        return res.status(404).json({ message: 'Pitch not found' });
      }
      filter.pitch = pitch._id;
    }

    const bookings = await Booking.find(filter).populate('pitch');
    res.json(bookings);
  } catch (err) {
    console.error('Error filtering bookings:', err.message);
    res.status(500).json({ message: 'Error filtering bookings' });
  }
});

// POST a new booking
router.post('/', async (req, res) => {
  try {
    const { name, pitchId, date, time } = req.body;

    // Check if pitch exists
    const pitch = await Pitch.findById(pitchId);
    if (!pitch) return res.status(404).json({ message: 'Pitch not found' });

    // Check if already booked
    const existingBooking = await Booking.findOne({ pitch: pitchId, date, time });
    if (existingBooking) {
      return res.status(409).json({ message: 'This time slot is already booked' });
    }

    // Create new booking
    const newBooking = new Booking({
      name,
      pitch: pitchId,
      date,
      time
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

module.exports = router;
