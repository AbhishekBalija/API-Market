const mongoose = require('mongoose');
const crypto = require('crypto');

const subscriptionSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Api',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  apiKey: {
    type: String,
    unique: true,
    default: function() {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  usageLimit: {
    type: Number,
    default: 1000 // Default limit of 1000 requests
  },
  currentUsage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for quick lookups by customer and API
subscriptionSchema.index({ customer: 1, api: 1 }, { unique: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;