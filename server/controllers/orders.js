const Order = require('../models/Order');
const User = require('../models/User');
const AdminEvent = require('../models/AdminEvent');

// Create order
const createOrder = async (req, res) => {
  try {
    const { productName, quantity, notes } = req.body;
    
    const order = new Order({
      user: req.user.id,
      productName,
      quantity,
      notes
    });
    
    await order.save();
    
    res.status(201).json({
      code: 'ORDER_CREATED',
      message: 'Order created successfully.',
      order: {
        id: order.id,
        productName: order.productName,
        quantity: order.quantity,
        status: order.status,
        notes: order.notes,
        createdAt: order.createdAt
      }
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
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({
      code: 'SUCCESS',
      orders: orders.map(order => ({
        id: order.id,
        productName: order.productName,
        quantity: order.quantity,
        status: order.status,
        notes: order.notes,
        createdAt: order.createdAt
      }))
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
    
    const query = {};
    
    // Filter by status
    if (status) {
      query.status = status.toUpperCase();
    }
    
    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }
    
    // Filter by search term
    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { 'user.name': { $regex: search, $options: 'i' } },
        { 'user.email': { $regex: search, $options: 'i' } }
      ];
    }
    
    const orders = await Order.find(query)
      .populate('user', 'id name email')
      .sort({ createdAt: -1 });
    
    res.json({
      code: 'SUCCESS',
      orders: orders.map(order => ({
        id: order.id,
        productName: order.productName,
        quantity: order.quantity,
        status: order.status,
        notes: order.notes,
        user: order.user ? {
          id: order.user.id,
          name: order.user.name,
          email: order.user.email
        } : null,
        createdAt: order.createdAt
      }))
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
    const currentOrder = await Order.findById(id);
    
    if (!currentOrder) {
      return res.status(404).json({
        code: 'ORDER_NOT_FOUND',
        message: 'Order not found.'
      });
    }
    
    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: status.toUpperCase(),
        notes: notes || currentOrder.notes
      },
      { new: true }
    );
    
    // Log admin event
    const adminEvent = new AdminEvent({
      admin: req.user.id,
      entityType: 'Order',
      entityId: id,
      action: 'UPDATE_STATUS',
      from: currentOrder.status,
      to: status.toUpperCase(),
      meta: notes ? JSON.stringify({ notes }) : null
    });
    
    await adminEvent.save();
    
    res.json({
      code: 'ORDER_UPDATED',
      message: 'Order status updated successfully.',
      order: {
        id: updatedOrder.id,
        productName: updatedOrder.productName,
        quantity: updatedOrder.quantity,
        status: updatedOrder.status,
        notes: updatedOrder.notes,
        createdAt: updatedOrder.createdAt
      }
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
    const existingOrder = await Order.findById(id);
    
    if (!existingOrder) {
      return res.status(404).json({
        code: 'ORDER_NOT_FOUND',
        message: 'Order not found.'
      });
    }
    
    // Delete order
    await Order.findByIdAndDelete(id);
    
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
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};