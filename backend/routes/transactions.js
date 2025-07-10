const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/transactions/sale
// @desc    Create a new sale transaction
// @access  Private
router.post('/sale', [
  auth,
  body('items').isArray({ min: 1 }),
  body('items.*.product').not().isEmpty(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('items.*.unitPrice').isFloat({ min: 0 }),
  body('paymentMethod').isIn(['cash', 'card', 'mobile', 'other']),
  body('total').isFloat({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    items,
    subtotal,
    tax = 0,
    discount = 0,
    total,
    paymentMethod,
    customer,
    notes
  } = req.body;

  try {
    // Validate all products exist and have sufficient stock
    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({ message: 'One or more products not found' });
    }

    // Check stock availability and update stock
    for (let i = 0; i < items.length; i++) {
      const product = products.find(p => p._id.toString() === items[i].product);
      if (product.stock < items[i].quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      // Update stock
      product.stock -= items[i].quantity;
      await product.save();
    }

    // Create transaction
    const transaction = new Transaction({
      type: 'sale',
      items: items.map(item => ({
        ...item,
        totalPrice: item.unitPrice * item.quantity
      })),
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      paymentStatus: 'completed',
      customer,
      cashier: req.user.id,
      notes
    });

    await transaction.save();

    res.json({
      message: 'Sale completed successfully',
      transaction: {
        id: transaction._id,
        transactionId: transaction.transactionId,
        total: transaction.total,
        items: transaction.items.length
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/transactions/return
// @desc    Create a return transaction
// @access  Private
router.post('/return', [
  auth,
  body('originalTransaction').not().isEmpty(),
  body('items').isArray({ min: 1 }),
  body('reason').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { originalTransaction, items, reason, notes } = req.body;

  try {
    // Get original transaction
    const original = await Transaction.findById(originalTransaction);
    if (!original) {
      return res.status(404).json({ message: 'Original transaction not found' });
    }

    // Validate return items
    const returnItems = [];
    let returnTotal = 0;

    for (const returnItem of items) {
      const originalItem = original.items.find(item => 
        item.product.toString() === returnItem.product
      );

      if (!originalItem) {
        return res.status(400).json({ message: 'Item not found in original transaction' });
      }

      if (returnItem.quantity > originalItem.quantity) {
        return res.status(400).json({ message: 'Return quantity cannot exceed original quantity' });
      }

      const product = await Product.findById(returnItem.product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Update stock (add back to inventory)
      product.stock += returnItem.quantity;
      await product.save();

      const itemTotal = returnItem.unitPrice * returnItem.quantity;
      returnItems.push({
        ...returnItem,
        totalPrice: itemTotal
      });

      returnTotal += itemTotal;
    }

    // Create return transaction
    const transaction = new Transaction({
      type: 'return',
      items: returnItems,
      subtotal: returnTotal,
      total: returnTotal,
      paymentMethod: 'refund',
      paymentStatus: 'completed',
      cashier: req.user.id,
      notes: `Return: ${reason}. ${notes || ''}`,
      receiptNumber: original.transactionId
    });

    await transaction.save();

    res.json({
      message: 'Return processed successfully',
      transaction: {
        id: transaction._id,
        transactionId: transaction.transactionId,
        total: transaction.total
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions
// @desc    Get all transactions with filtering and pagination
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || '';
    const startDate = req.query.startDate || '';
    const endDate = req.query.endDate || '';
    const cashier = req.query.cashier || '';

    const query = {};

    if (type) query.type = type;
    if (cashier) query.cashier = cashier;

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .populate('cashier', 'name')
      .populate('items.product', 'name sku price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions/:id
// @desc    Get transaction by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('cashier', 'name')
      .populate('items.product', 'name sku price cost');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/transactions/:id/void
// @desc    Void a transaction
// @access  Private (Manager/Admin)
router.put('/:id/void', [
  auth,
  body('reason', 'Void reason is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check permissions
  if (!req.user.permissions.canVoidTransactions && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to void transactions' });
  }

  const { reason } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.voided) {
      return res.status(400).json({ message: 'Transaction is already voided' });
    }

    // If it's a sale, restore stock
    if (transaction.type === 'sale') {
      for (const item of transaction.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    // If it's a return, reduce stock
    if (transaction.type === 'return') {
      for (const item of transaction.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock -= item.quantity;
          await product.save();
        }
      }
    }

    transaction.voided = true;
    transaction.voidedBy = req.user.id;
    transaction.voidedAt = new Date();
    transaction.voidReason = reason;

    await transaction.save();

    res.json({
      message: 'Transaction voided successfully',
      transaction
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions/reports/sales
// @desc    Get sales report
// @access  Private
router.get('/reports/sales', auth, async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    const sales = await Transaction.aggregate([
      {
        $match: {
          type: 'sale',
          voided: { $ne: true },
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          totalTransactions: { $sum: 1 },
          averageTransaction: { $avg: '$total' }
        }
      }
    ]);

    const dailySales = await Transaction.aggregate([
      {
        $match: {
          type: 'sale',
          voided: { $ne: true },
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          sales: { $sum: '$total' },
          transactions: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      summary: sales[0] || { totalSales: 0, totalTransactions: 0, averageTransaction: 0 },
      dailySales
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 