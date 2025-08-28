const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middleware/authAdmin');
const User = require('../models/User');

// POST /login - Admin login with JWT
router.post('/login', adminController.login);

// GET /pending-users - Get all users with status: 'pending'
router.get('/pending-users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }).select('-password');
    res.json({
      code: 'SUCCESS',
      message: 'Pending users retrieved successfully.',
      users
    });
  } catch (error) {
    console.error('Error fetching pending users:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching pending users.'
    });
  }
});

// GET /approved-users - Get all users with status: 'approved'
router.get('/approved-users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({ status: 'approved' }).select('-password');
    res.json({
      code: 'SUCCESS',
      message: 'Approved users retrieved successfully.',
      users
    });
  } catch (error) {
    console.error('Error fetching approved users:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching approved users.'
    });
  }
});

// GET /rejected-users - Get all users with status: 'rejected'
router.get('/rejected-users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({ status: 'rejected' }).select('-password');
    res.json({
      code: 'SUCCESS',
      message: 'Rejected users retrieved successfully.',
      users
    });
  } catch (error) {
    console.error('Error fetching rejected users:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching rejected users.'
    });
  }
});

// PATCH /approve/:userId - Update user status to 'approved'
router.patch('/approve/:userId', authenticateAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user and update status
    const user = await User.findByIdAndUpdate(
      userId,
      { status: 'approved' },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      message: 'User approved successfully.',
      user
    });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while approving the user.'
    });
  }
});

// PATCH /reject/:userId - Update user status to 'rejected'
router.patch('/reject/:userId', authenticateAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user and update status
    const user = await User.findByIdAndUpdate(
      userId,
      { status: 'rejected' },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      message: 'User rejected successfully.',
      user
    });
  } catch (error) {
    console.error('Error rejecting user:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while rejecting the user.'
    });
  }
});

module.exports = router;