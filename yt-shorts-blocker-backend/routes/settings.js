const express = require('express');
const router = express.Router();
const Setting = require('../models/setting');

// GET /api/settings/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const setting = await Setting.findOne({ userId });

  if (setting) {
    res.json(setting);
  } else {
    const newSetting = await Setting.create({ userId });
    res.json(newSetting);
  }
});

// POST /api/settings/:userId
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { enabled } = req.body;

  const setting = await Setting.findOneAndUpdate(
    { userId },
    { enabled },
    { new: true, upsert: true }
  );

  res.json(setting);
});

module.exports = router;
