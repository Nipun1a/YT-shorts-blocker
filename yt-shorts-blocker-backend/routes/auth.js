const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route to handle user registration
router.post('/register', register);

// Route to handle user login
router.post('/login', login);

module.exports = router;
