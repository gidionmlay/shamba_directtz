const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /register - Register a new user
router.post('/register', authController.register);

// POST /verify-otp - Verify OTP for user
router.post('/verify-otp', authController.verifyOTP);

// POST /login - Login with email & password
router.post('/login', authController.login);

module.exports = router;