// We'll inject the prisma client when initializing the controller
let prismaInstance = null;

const setPrismaInstance = (prisma) => {
  prismaInstance = prisma;
};

// Create order
const createOrder = async (req, res) => {
  try {
    const { productName, quantity, notes } = req.body;
    
    const order = await prismaInstance.order.create({
      data: {
        userId: req.user.id,
        productName,
        quantity,
        notes
      },
      select: {
        id: true,
        productName: true,
        quantity: true,
        status: true,
        notes: true,
        createdAt: true
      }
    });
    
    res.status(201).json({
      code: 'ORDER_CREATED',
      message: 'Order created successfully.',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while creating the order.'
    });
  }
};

// List current user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await prismaInstance.order.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      code: 'SUCCESS',
      orders
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching your orders.'
    });
  }
};

// List all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate, search } = req.query;
    
    const where = {};
    
    // Filter by status
    if (status) {
      where.status = status.toUpperCase();
    }
    
    // Filter by date range
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }
    
    // Filter by search term
    if (search) {
      where.OR = [
        { productName: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } }
      ];
    }
    
    const orders = await prismaInstance.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      code: 'SUCCESS',
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching orders.'
    });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    if (!status) {
      return res.status(400).json({
        code: 'MISSING_STATUS',
        message: 'Status is required.'
      });
    }
    
    // Check if status is valid
    const validStatuses = ['PENDING', 'CONFIRMED', 'DELIVERED'];
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        code: 'INVALID_STATUS',
        message: 'Invalid status. Must be one of: PENDING, CONFIRMED, DELIVERED.'
      });
    }
    
    // Get current order to log the change
    const currentOrder = await prismaInstance.order.findUnique({
      where: { id }
    });
    
    if (!currentOrder) {
      return res.status(404).json({
        code: 'ORDER_NOT_FOUND',
        message: 'Order not found.'
      });
    }
    
    // Update order
    const updatedOrder = await prismaInstance.order.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
        notes: notes || currentOrder.notes
      },
      select: {
        id: true,
        productName: true,
        quantity: true,
        status: true,
        notes: true,
        createdAt: true
      }
    });
    
    // Log admin event
    await prismaInstance.adminEvent.create({
      data: {
        adminId: req.user.id,
        entityType: 'Order',
        entityId: id,
        action: 'UPDATE_STATUS',
        from: currentOrder.status,
        to: status.toUpperCase(),
        meta: notes ? JSON.stringify({ notes }) : null
      }
    });
    
    res.json({
      code: 'ORDER_UPDATED',
      message: 'Order status updated successfully.',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while updating the order status.'
    });
  }
};

// Delete order (admin only)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if order exists
    const existingOrder = await prismaInstance.order.findUnique({
      where: { id }
    });
    
    if (!existingOrder) {
      return res.status(404).json({
        code: 'ORDER_NOT_FOUND',
        message: 'Order not found.'
      });
    }
    
    // Delete order
    await prismaInstance.order.delete({
      where: { id }
    });
    
    res.json({
      code: 'ORDER_DELETED',
      message: 'Order deleted successfully.'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while deleting the order.'
    });
  }
};

module.exports = {
  setPrismaInstance,
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};