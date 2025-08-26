// We'll inject the prisma client when initializing the controller
let prismaInstance = null;

const setPrismaInstance = (prisma) => {
  prismaInstance = prisma;
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prismaInstance.user.findMany({
      where: {
        role: 'SUPPLIER'
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        businessRegNo: true,
        email: true,
        phone: true,
        location: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      code: 'SUCCESS',
      suppliers
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
    
    const supplier = await prismaInstance.user.findUnique({
      where: {
        id,
        role: 'SUPPLIER'
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        businessRegNo: true,
        email: true,
        phone: true,
        location: true,
        status: true,
        createdAt: true
      }
    });
    
    if (!supplier) {
      return res.status(404).json({
        code: 'SUPPLIER_NOT_FOUND',
        message: 'Supplier not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      supplier
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
    const existingSupplier = await prismaInstance.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ],
        role: 'SUPPLIER'
      }
    });
    
    if (existingSupplier) {
      return res.status(409).json({
        code: 'SUPPLIER_EXISTS',
        message: 'A supplier with this email or phone number already exists.'
      });
    }
    
    const supplier = await prismaInstance.user.create({
      data: {
        name,
        companyName,
        businessRegNo,
        email,
        phone,
        location,
        role: 'SUPPLIER',
        status: 'APPROVED' // Admin-created suppliers are automatically approved
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        businessRegNo: true,
        email: true,
        phone: true,
        location: true,
        status: true,
        createdAt: true
      }
    });
    
    res.status(201).json({
      code: 'SUPPLIER_CREATED',
      message: 'Supplier created successfully.',
      supplier
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
    const existingSupplier = await prismaInstance.user.findUnique({
      where: {
        id,
        role: 'SUPPLIER'
      }
    });
    
    if (!existingSupplier) {
      return res.status(404).json({
        code: 'SUPPLIER_NOT_FOUND',
        message: 'Supplier not found.'
      });
    }
    
    // Check if email or phone already exists for another supplier
    if (email || phone) {
      const duplicateSupplier = await prismaInstance.user.findFirst({
        where: {
          id: { not: id },
          OR: [
            { email: email },
            { phone: phone }
          ],
          role: 'SUPPLIER'
        }
      });
      
      if (duplicateSupplier) {
        return res.status(409).json({
          code: 'SUPPLIER_EXISTS',
          message: 'A supplier with this email or phone number already exists.'
        });
      }
    }
    
    const supplier = await prismaInstance.user.update({
      where: { id },
      data: {
        name,
        companyName,
        businessRegNo,
        email,
        phone,
        location,
        status
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        businessRegNo: true,
        email: true,
        phone: true,
        location: true,
        status: true,
        createdAt: true
      }
    });
    
    res.json({
      code: 'SUPPLIER_UPDATED',
      message: 'Supplier updated successfully.',
      supplier
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
    const existingSupplier = await prismaInstance.user.findUnique({
      where: {
        id,
        role: 'SUPPLIER'
      }
    });
    
    if (!existingSupplier) {
      return res.status(404).json({
        code: 'SUPPLIER_NOT_FOUND',
        message: 'Supplier not found.'
      });
    }
    
    // Delete supplier
    await prismaInstance.user.delete({
      where: { id }
    });
    
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
  setPrismaInstance,
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};