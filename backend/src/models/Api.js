const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'API name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'API description is required']
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endpoint: {
    type: String,
    required: [true, 'API endpoint is required'],
    trim: true
  },
  documentation: {
    type: String,
    required: [true, 'API documentation is required']
  },
  pricing: {
    amount: {
      type: Number,
      required: [true, 'Price amount is required'],
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    billingCycle: {
      type: String,
      enum: ['one-time', 'monthly', 'yearly'],
      default: 'monthly'
    }
  },
  category: {
    type: String,
    required: [true, 'API category is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Api = mongoose.model('Api', apiSchema);

module.exports = Api;