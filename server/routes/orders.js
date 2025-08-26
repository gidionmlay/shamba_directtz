const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

// User routes
router.post('/', authenticateToken, validateOrder, orderController.createOrder);
router.get('/my', authenticateToken, orderController.getUserOrders);

// Admin routes
router.get('/', authenticateToken, requireAdmin, orderController.getAllOrders);
router.put('/:id/status', authenticateToken, requireAdmin, orderController.updateOrderStatus);
router.delete('/:id', authenticateToken, requireAdmin, orderController.deleteOrder);

module.exports = router;