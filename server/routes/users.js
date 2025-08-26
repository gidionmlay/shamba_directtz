const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/register/farmer', userController.registerFarmer);
router.post('/register/supplier', userController.registerSupplier);
router.post('/login', userController.login);

// Protected routes
router.get('/me', authenticateToken, userController.getCurrentUser);

// Admin routes
router.get('/', authenticateToken, requireAdmin, userController.getAllUsers);
router.patch('/:id/approve', authenticateToken, requireAdmin, userController.approveUser);
router.patch('/:id/reject', authenticateToken, requireAdmin, userController.rejectUser);
router.put('/:id/role', authenticateToken, requireAdmin, userController.updateUserRole);
router.delete('/:id', authenticateToken, requireAdmin, userController.deleteUser);

module.exports = router;