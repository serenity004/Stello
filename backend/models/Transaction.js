const mongoose = require('mongoose');

const transactionItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  }
});

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['sale', 'return', 'refund', 'adjustment'],
    required: true
  },
  items: [transactionItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'mobile', 'other'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    loyaltyId: String
  },
  cashier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: String,
  receiptNumber: String,
  voided: {
    type: Boolean,
    default: false
  },
  voidedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  voidedAt: Date,
  voidReason: String
}, {
  timestamps: true
});

// Generate transaction ID
transactionSchema.pre('save', async function(next) {
  if (this.isNew && !this.transactionId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get count of transactions for today
    const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    const count = await this.constructor.countDocuments({
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });
    
    this.transactionId = `TXN-${year}${month}${day}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Virtual for profit calculation
transactionSchema.virtual('profit').get(function() {
  let totalProfit = 0;
  this.items.forEach(item => {
    // This would need to be calculated with actual cost from product
    // For now, we'll use a simple calculation
    totalProfit += (item.unitPrice - (item.unitPrice * 0.7)) * item.quantity; // Assuming 30% margin
  });
  return totalProfit;
});

// Indexes
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ cashier: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Transaction', transactionSchema); 