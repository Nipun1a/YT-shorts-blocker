const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const settingsRoutes = require('./routes/settings');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this here to respond at root URL
app.get('/', (req, res) => {
  res.send('YouTube Shorts Blocker Backend is running successfully!');
});

// API routes
app.use('/api/settings', settingsRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch(err => console.error(err));
