const mongoose = require('mongoose');

const usageStatisticSchema = new mongoose.Schema({
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Api',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  requestCount: {
    type: Number,
    default: 0
  },
  period: {
    type: String,
    enum: ['daily', 'monthly'],
    default: 'daily'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for efficient lookups
usageStatisticSchema.index({ api: 1, customer: 1, period: 1, date: 1 });

const UsageStatistic = mongoose.model('UsageStatistic', usageStatisticSchema);

module.exports = UsageStatistic;