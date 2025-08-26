const jwt = require('jsonwebtoken');

// We'll inject the prisma client when initializing the middleware
let prismaInstance = null;

const setPrismaInstance = (prisma) => {
  prismaInstance = prisma;
};

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
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
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
  setPrismaInstance,
  authenticateToken,
  requireAdmin
};