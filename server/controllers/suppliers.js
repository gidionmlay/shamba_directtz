const User = require('../models/User');

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await User.find({ role: 'SUPPLIER' })
      .select('-passwordHash -__v')
      .sort({ createdAt: -1 });
    
    res.json({
      code: 'SUCCESS',
      suppliers: suppliers.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        companyName: supplier.companyName,
        businessRegNo: supplier.businessRegNo,
        email: supplier.email,
        phone: supplier.phone,
        location: supplier.location,
        status: supplier.status,
        createdAt: supplier.createdAt
      }))
    });
  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching suppliers.'
    });
  }
};

// Get supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const supplier = await User.findOne({ _id: id, role: 'SUPPLIER' })
      .select('-passwordHash -__v');
    
    if (!supplier) {
      return res.status(404).json({
        code: 'SUPPLIER_NOT_FOUND',
        message: 'Supplier not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      supplier: {
        id: supplier.id,
        name: supplier.name,
        companyName: supplier.companyName,
        businessRegNo: supplier.businessRegNo,
        email: supplier.email,
        phone: supplier.phone,
        location: supplier.location,
        status: supplier.status,
        createdAt: supplier.createdAt
      }
    });
  } catch (error) {
    console.error('Get supplier error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching the supplier.'
    });
  }
};

// Create supplier (admin only)
const createSupplier = async (req, res) => {
  try {
    const {
      name,
      companyName,
      businessRegNo,
      email,
      phone,
      location
    } = req.body;
    
    // Check if supplier already exists
    const existingSupplier = await User.findOne({
      $or: [
        { email: email },
        { phone: phone }
      ],
      role: 'SUPPLIER'
    });
    
    if (existingSupplier) {
      return res.status(409).json({
        code: 'SUPPLIER_EXISTS',
        message: 'A supplier with this email or phone number already exists.'
      });
    }
    
    const supplier = new User({
      name,
      companyName,
      businessRegNo,
      email,
      phone,
      location,
      role: 'SUPPLIER',
      status: 'APPROVED' // Admin-created suppliers are automatically approved
    });
    
    await supplier.save();
    
    res.status(201).json({
      code: 'SUPPLIER_CREATED',
      message: 'Supplier created successfully.',
      supplier: {
        id: supplier.id,
        name: supplier.name,
        companyName: supplier.companyName,
        businessRegNo: supplier.businessRegNo,
        email: supplier.email,
        phone: supplier.phone,
        location: supplier.location,
        status: supplier.status,
        createdAt: supplier.createdAt
      }
    });
  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while creating the supplier.'
    });
  }
};

// Update supplier (admin only)
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      companyName,
      businessRegNo,
      email,
      phone,
      location,
      status
    } = req.body;
    
    // Check if supplier exists
    const existingSupplier = await User.findOne({ _id: id, role: 'SUPPLIER' });
    
    if (!existingSupplier) {
      return res.status(404).json({
        code: 'SUPPLIER_NOT_FOUND',
        message: 'Supplier not found.'
      });
    }
    
    // Check if email or phone already exists for another supplier
    if (email || phone) {
      const duplicateSupplier = await User.findOne({
        _id: { $ne: id },
        $or: [
          { email: email },
          { phone: phone }
        ],
        role: 'SUPPLIER'
      });
      
      if (duplicateSupplier) {
        return res.status(409).json({
          code: 'SUPPLIER_EXISTS',
          message: 'A supplier with this email or phone number already exists.'
        });
      }
    }
    
    const supplier = await User.findByIdAndUpdate(
      id,
      {
        name,
        companyName,
        businessRegNo,
        email,
        phone,
        location,
        status
      },
      { new: true }
    ).select('-passwordHash -__v');
    
    res.json({
      code: 'SUPPLIER_UPDATED',
      message: 'Supplier updated successfully.',
      supplier: {
        id: supplier.id,
        name: supplier.name,
        companyName: supplier.companyName,
        businessRegNo: supplier.businessRegNo,
        email: supplier.email,
        phone: supplier.phone,
        location: supplier.location,
        status: supplier.status,
        createdAt: supplier.createdAt
      }
    });
  } catch (error) {
    console.error('Update supplier error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while updating the supplier.'
    });
  }
};

// Delete supplier (admin only)
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if supplier exists
    const existingSupplier = await User.findOne({ _id: id, role: 'SUPPLIER' });
    
    if (!existingSupplier) {
      return res.status(404).json({
        code: 'SUPPLIER_NOT_FOUND',
        message: 'Supplier not found.'
      });
    }
    
    // Delete supplier
    await User.findByIdAndDelete(id);
    
    res.json({
      code: 'SUPPLIER_DELETED',
      message: 'Supplier deleted successfully.'
    });
  } catch (error) {
    console.error('Delete supplier error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while deleting the supplier.'
    });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};