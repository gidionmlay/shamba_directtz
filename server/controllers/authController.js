const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Utility function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Utility function to generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        code: 'MISSING_FIELDS',
        message: 'Please provide all required fields: name, email, password, role.'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({
        code: 'USER_EXISTS',
        message: 'A user with this email already exists.'
      });
    }
    
    // Validate role
    const validRoles = ['farmer', 'supplier'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        code: 'INVALID_ROLE',
        message: 'Role must be either "farmer" or "supplier".'
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
    // Create user (password will be hashed by pre-save hook)
    const user = new User({
      name,
      email,
      password,
      role,
      otp,
      otpExpiry
    });
    
    await user.save();
    
    res.status(201).json({
      code: 'REGISTRATION_SUCCESS',
      message: 'User registered successfully. Please check your email for the verification code.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during registration.'
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Validation
    if (!email || !otp) {
      return res.status(400).json({
        code: 'MISSING_FIELDS',
        message: 'Please provide email and OTP.'
      });
    }
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        code: 'INVALID_OTP',
        message: 'Invalid OTP.'
      });
    }
    
    // Check if OTP is expired
    if (user.isOtpExpired()) {
      return res.status(400).json({
        code: 'EXPIRED_OTP',
        message: 'OTP has expired. Please request a new one.'
      });
    }
    
    // Update user status to approved and clear OTP
    user.status = 'approved';
    user.otp = undefined;
    user.otpExpiry = undefined;
    
    await user.save();
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      code: 'OTP_VERIFIED',
      message: 'OTP verified successfully. Your account is now active.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during OTP verification.'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        code: 'MISSING_FIELDS',
        message: 'Please provide email and password.'
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.'
      });
    }
    
    // Check user status
    if (user.status === 'pending') {
      return res.status(401).json({
        code: 'ACCOUNT_PENDING',
        message: 'Please verify your email using the OTP sent to you.'
      });
    }
    
    if (user.status === 'rejected') {
      return res.status(401).json({
        code: 'ACCOUNT_REJECTED',
        message: 'Your account has been rejected. Please contact support.'
      });
    }
    
    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.'
      });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      code: 'LOGIN_SUCCESS',
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during login.'
    });
  }
};

module.exports = {
  register,
  verifyOTP,
  login
};