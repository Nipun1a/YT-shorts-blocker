const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes BEFORE database connection
app.use('/api/auth', authRoutes);         // Login & Register routes
app.use('/api/settings', settingsRoutes); // Settings routes

// Optional root route for browser test
app.get('/', (req, res) => {
  res.send('YouTube Shorts Blocker Backend is running 🚀');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
