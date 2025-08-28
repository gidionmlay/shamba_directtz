const Product = require('../models/Product');
const User = require('../models/User');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: true })
      .populate('supplier', 'id name companyName email phone')
      .sort({ createdAt: -1 });
    
    res.json({
      code: 'SUCCESS',
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        active: product.active,
        supplier: product.supplier ? {
          id: product.supplier.id,
          name: product.supplier.name,
          companyName: product.supplier.companyName,
          email: product.supplier.email,
          phone: product.supplier.phone
        } : null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }))
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching products.'
    });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id)
      .populate('supplier', 'id name companyName email phone');
    
    if (!product) {
      return res.status(404).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      product: {
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        active: product.active,
        supplier: product.supplier ? {
          id: product.supplier.id,
          name: product.supplier.name,
          companyName: product.supplier.companyName,
          email: product.supplier.email,
          phone: product.supplier.phone
        } : null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching the product.'
    });
  }
};

// Create product (admin only)
const createProduct = async (req, res) => {
  try {
    const { name, unit, price, supplierId } = req.body;
    
    // Check if supplier exists and is a supplier
    let supplier = null;
    if (supplierId) {
      supplier = await User.findOne({
        _id: supplierId,
        role: 'SUPPLIER'
      });
      
      if (!supplier) {
        return res.status(400).json({
          code: 'INVALID_SUPPLIER',
          message: 'Invalid supplier ID. Supplier not found or not a supplier.'
        });
      }
    }
    
    const product = new Product({
      name,
      unit,
      price: parseFloat(price) || null,
      supplier: supplierId || null
    });
    
    await product.save();
    
    // Populate supplier details
    if (supplierId) {
      await product.populate('supplier', 'id name companyName email phone');
    }
    
    res.status(201).json({
      code: 'PRODUCT_CREATED',
      message: 'Product created successfully.',
      product: {
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        active: product.active,
        supplier: product.supplier ? {
          id: product.supplier.id,
          name: product.supplier.name,
          companyName: product.supplier.companyName,
          email: product.supplier.email,
          phone: product.supplier.phone
        } : null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while creating the product.'
    });
  }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit, price, active, supplierId } = req.body;
    
    // Check if product exists
    const existingProduct = await Product.findById(id);
    
    if (!existingProduct) {
      return res.status(404).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }
    
    // Check if supplier exists and is a supplier
    let supplier = null;
    if (supplierId) {
      supplier = await User.findOne({
        _id: supplierId,
        role: 'SUPPLIER'
      });
      
      if (!supplier) {
        return res.status(400).json({
          code: 'INVALID_SUPPLIER',
          message: 'Invalid supplier ID. Supplier not found or not a supplier.'
        });
      }
    }
    
    // Update product
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        unit,
        price: price ? parseFloat(price) : undefined,
        active,
        supplier: supplierId || null
      },
      { new: true }
    );
    
    // Populate supplier details
    if (supplierId) {
      await product.populate('supplier', 'id name companyName email phone');
    }
    
    res.json({
      code: 'PRODUCT_UPDATED',
      message: 'Product updated successfully.',
      product: {
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        active: product.active,
        supplier: product.supplier ? {
          id: product.supplier.id,
          name: product.supplier.name,
          companyName: product.supplier.companyName,
          email: product.supplier.email,
          phone: product.supplier.phone
        } : null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while updating the product.'
    });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const existingProduct = await Product.findById(id);
    
    if (!existingProduct) {
      return res.status(404).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }
    
    // Delete product (soft delete by setting active to false)
    const product = await Product.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );
    
    res.json({
      code: 'PRODUCT_DELETED',
      message: 'Product deleted successfully.',
      product: {
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        active: product.active,
        supplier: product.supplier ? {
          id: product.supplier.id,
          name: product.supplier.name,
          companyName: product.supplier.companyName,
          email: product.supplier.email,
          phone: product.supplier.phone
        } : null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while deleting the product.'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};