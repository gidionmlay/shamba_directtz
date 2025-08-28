const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Access token required.'
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Fetch user from database to ensure they still exist and get latest data
    const user = await User.findById(decoded.id).select('-passwordHash');
    
    if (!user) {
      return res.status(401).json({
        code: 'INVALID_TOKEN',
        message: 'User no longer exists.'
      });
    }
    
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (err) {
    return res.status(403).json({
      code: 'INVALID_TOKEN',
      message: 'Invalid or expired token.'
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      code: 'FORBIDDEN',
      message: 'Admin access required.'
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin
};