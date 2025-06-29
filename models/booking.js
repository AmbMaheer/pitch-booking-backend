const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  pitch: { type: mongoose.Schema.Types.ObjectId, ref: 'pitch',required: true },
  date: {type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
