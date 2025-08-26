const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/suppliers');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateSupplier } = require('../middleware/validation');

// Public routes
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getSupplierById);

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateSupplier, supplierController.createSupplier);
router.put('/:id', authenticateToken, requireAdmin, validateSupplier, supplierController.updateSupplier);
router.delete('/:id', authenticateToken, requireAdmin, supplierController.deleteSupplier);

module.exports = router;