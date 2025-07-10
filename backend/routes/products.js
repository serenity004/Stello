const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with pagination and filtering
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const status = req.query.status || '';

    const query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { barcode: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('createdBy', 'name')
      .populate('lastUpdatedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
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

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('lastUpdatedBy', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Manager/Admin)
router.post('/', [
  auth,
  body('name', 'Product name is required').not().isEmpty(),
  body('sku', 'SKU is required').not().isEmpty(),
  body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  body('cost', 'Cost must be a positive number').isFloat({ min: 0 }),
  body('category', 'Category is required').isIn(['Electronics', 'Clothing', 'Groceries', 'Home & Garden', 'Sports', 'Books', 'Other'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check permissions
  if (!req.user.permissions.canManageProducts && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to manage products' });
  }

  const {
    name,
    sku,
    barcode,
    description,
    category,
    price,
    cost,
    stock,
    minStock,
    maxStock,
    unit,
    supplier,
    tags
  } = req.body;

  try {
    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    // Check if barcode already exists
    if (barcode) {
      const existingBarcode = await Product.findOne({ barcode });
      if (existingBarcode) {
        return res.status(400).json({ message: 'Barcode already exists' });
      }
    }

    const product = new Product({
      name,
      sku,
      barcode,
      description,
      category,
      price,
      cost,
      stock: stock || 0,
      minStock: minStock || 5,
      maxStock,
      unit: unit || 'piece',
      supplier,
      tags,
      createdBy: req.user.id,
      lastUpdatedBy: req.user.id
    });

    await product.save();

    res.json({
      message: 'Product created successfully',
      product
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Manager/Admin)
router.put('/:id', [
  auth,
  body('name', 'Product name is required').not().isEmpty(),
  body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  body('cost', 'Cost must be a positive number').isFloat({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check permissions
  if (!req.user.permissions.canManageProducts && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to manage products' });
  }

  const {
    name,
    description,
    category,
    price,
    cost,
    minStock,
    maxStock,
    unit,
    supplier,
    tags,
    status
  } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    product.name = name;
    if (description !== undefined) product.description = description;
    if (category) product.category = category;
    product.price = price;
    product.cost = cost;
    if (minStock !== undefined) product.minStock = minStock;
    if (maxStock !== undefined) product.maxStock = maxStock;
    if (unit) product.unit = unit;
    if (supplier) product.supplier = supplier;
    if (tags) product.tags = tags;
    if (status) product.status = status;
    product.lastUpdatedBy = req.user.id;

    await product.save();

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can delete products' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/search/barcode/:barcode
// @desc    Search product by barcode
// @access  Private
router.get('/search/barcode/:barcode', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/search/sku/:sku
// @desc    Search product by SKU
// @access  Private
router.get('/search/sku/:sku', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku.toUpperCase() });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/low-stock
// @desc    Get products with low stock
// @access  Private
router.get('/low-stock', auth, async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$stock', '$minStock'] }
    }).sort({ stock: 1 });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 