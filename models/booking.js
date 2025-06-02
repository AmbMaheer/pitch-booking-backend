const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pitch: { type: mongoose.Schema.Types.ObjectId, ref: 'Pitch' },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
