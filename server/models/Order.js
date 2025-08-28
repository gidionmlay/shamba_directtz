const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'DELIVERED'],
    default: 'PENDING'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create indexes for frequently queried fields
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ productName: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;