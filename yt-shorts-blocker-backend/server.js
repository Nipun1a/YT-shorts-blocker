const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const settingsRoutes = require('./routes/settings');

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/settings', settingsRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
}).catch(err => console.error(err));
