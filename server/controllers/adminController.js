const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Utility function to generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin.id, username: admin.username },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validation
    if (!username || !password) {
      return res.status(400).json({
        code: 'MISSING_FIELDS',
        message: 'Please provide username and password.'
      });
    }
    
    // Find admin by username
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid username or password.'
      });
    }
    
    // Verify password
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid username or password.'
      });
    }
    
    // Generate token
    const token = generateToken(admin);
    
    res.json({
      code: 'LOGIN_SUCCESS',
      message: 'Admin login successful.',
      admin: {
        id: admin.id,
        username: admin.username,
        createdAt: admin.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during login.'
    });
  }
};

module.exports = {
  login
};