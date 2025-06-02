const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const pitchRoutes = require('./routes/pitches');
app.use('/api/pitches', pitchRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Pitch Booking API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});

