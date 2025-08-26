const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateProduct, productController.createProduct);
router.put('/:id', authenticateToken, requireAdmin, validateProduct, productController.updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, productController.deleteProduct);

module.exports = router;