const mongoose = require('mongoose');

const adminEventSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entityType: {
    type: String,
    required: true
  },
  entityId: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  meta: {
    type: String // Store as JSON string
  }
}, {
  timestamps: true // Automatically adds createdAt
});

// Create indexes for frequently queried fields
adminEventSchema.index({ admin: 1 });
adminEventSchema.index({ entityType: 1 });
adminEventSchema.index({ entityId: 1 });
adminEventSchema.index({ action: 1 });
adminEventSchema.index({ createdAt: -1 });

const AdminEvent = mongoose.model('AdminEvent', adminEventSchema);

module.exports = AdminEvent;