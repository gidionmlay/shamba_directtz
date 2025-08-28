const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create indexes for frequently queried fields
productSchema.index({ name: 1 });
productSchema.index({ active: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;