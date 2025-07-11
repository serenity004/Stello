const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/database');
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
    const skip = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    if (category) {
      query = query.eq('category', category);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data: products, error, count } = await query;
    if (error) return res.status(400).json({ error: error.message });

    res.json({
      products,
      pagination: {
        current: page,
        pages: Math.ceil((count || 0) / limit),
        total: count || 0,
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
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error || !product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Manager/Admin)
router.post('/', [
  auth,
  body('name', 'Product name is required').not().isEmpty(),
  body('price', 'Price must be a positive number').isFloat({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check permissions
  if (!req.user.permissions?.canManageProducts && req.user.role !== 'admin') {
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
    tags,
    status
  } = req.body;

  try {
    // Check if SKU already exists
    const { data: existingProduct, error: skuError } = await supabase
      .from('products')
      .select('id')
      .eq('sku', sku)
      .maybeSingle();
    if (skuError) return res.status(400).json({ error: skuError.message });
    if (existingProduct) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    // Check if barcode already exists
    if (barcode) {
      const { data: existingBarcode, error: barcodeError } = await supabase
        .from('products')
        .select('id')
        .eq('barcode', barcode)
        .maybeSingle();
      if (barcodeError) return res.status(400).json({ error: barcodeError.message });
      if (existingBarcode) {
        return res.status(400).json({ message: 'Barcode already exists' });
      }
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([{
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
        status,
        created_by: req.user.id,
        last_updated_by: req.user.id
      }])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

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
  body('price', 'Price must be a positive number').isFloat({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check permissions
  if (!req.user.permissions?.canManageProducts && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to manage products' });
  }

  const updateFields = { ...req.body, last_updated_by: req.user.id };

  try {
    const { data: product, error } = await supabase
      .from('products')
      .update(updateFields)
      .eq('id', req.params.id)
      .select()
      .single();
    if (error || !product) {
      return res.status(404).json({ message: 'Product not found or update failed' });
    }
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can delete products' });
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);
    if (error) {
      return res.status(404).json({ message: 'Product not found or delete failed' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/search/barcode/:barcode
// @desc    Search product by barcode
// @access  Private
router.get('/search/barcode/:barcode', auth, async (req, res) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('barcode', req.params.barcode)
      .maybeSingle();
    if (error || !product) {
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
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('sku', req.params.sku.toUpperCase())
      .maybeSingle();
    if (error || !product) {
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
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .lte('stock', 5) // You can adjust this threshold as needed
      .order('stock', { ascending: true });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 