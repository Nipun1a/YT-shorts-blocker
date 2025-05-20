const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  userId: String,
  enabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Setting', SettingSchema);
