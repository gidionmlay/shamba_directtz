const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Admin authentication middleware
const authenticateAdmin = async (req, res, next) => {
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
    
    // Fetch admin from database to ensure they still exist and get latest data
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({
        code: 'INVALID_TOKEN',
        message: 'Admin no longer exists.'
      });
    }
    
    req.admin = {
      id: admin.id,
      username: admin.username
    };
    
    next();
  } catch (err) {
    return res.status(403).json({
      code: 'INVALID_TOKEN',
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = authenticateAdmin;