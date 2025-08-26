// We'll inject the prisma client when initializing the controller
let prismaInstance = null;

const setPrismaInstance = (prisma) => {
  prismaInstance = prisma;
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prismaInstance.product.findMany({
      where: {
        active: true
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            companyName: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      code: 'SUCCESS',
      products
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
    
    const product = await prismaInstance.product.findUnique({
      where: { id },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            companyName: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    if (!product) {
      return res.status(404).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      product
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
      supplier = await prismaInstance.user.findUnique({
        where: {
          id: supplierId,
          role: 'SUPPLIER'
        }
      });
      
      if (!supplier) {
        return res.status(400).json({
          code: 'INVALID_SUPPLIER',
          message: 'Invalid supplier ID. Supplier not found or not a supplier.'
        });
      }
    }
    
    const product = await prismaInstance.product.create({
      data: {
        name,
        unit,
        price: parseFloat(price) || null,
        supplierId: supplierId || null
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            companyName: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    res.status(201).json({
      code: 'PRODUCT_CREATED',
      message: 'Product created successfully.',
      product
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
    const existingProduct = await prismaInstance.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return res.status(404).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }
    
    // Check if supplier exists and is a supplier
    let supplier = null;
    if (supplierId) {
      supplier = await prismaInstance.user.findUnique({
        where: {
          id: supplierId,
          role: 'SUPPLIER'
        }
      });
      
      if (!supplier) {
        return res.status(400).json({
          code: 'INVALID_SUPPLIER',
          message: 'Invalid supplier ID. Supplier not found or not a supplier.'
        });
      }
    }
    
    const product = await prismaInstance.product.update({
      where: { id },
      data: {
        name,
        unit,
        price: price ? parseFloat(price) : undefined,
        active,
        supplierId: supplierId || null
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            companyName: true,
            email: true,
            phone: true
          }
        }
      }
    });
    
    res.json({
      code: 'PRODUCT_UPDATED',
      message: 'Product updated successfully.',
      product
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
    const existingProduct = await prismaInstance.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return res.status(404).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found.'
      });
    }
    
    // Delete product (soft delete by setting active to false)
    const product = await prismaInstance.product.update({
      where: { id },
      data: {
        active: false
      }
    });
    
    res.json({
      code: 'PRODUCT_DELETED',
      message: 'Product deleted successfully.',
      product
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
  setPrismaInstance,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};