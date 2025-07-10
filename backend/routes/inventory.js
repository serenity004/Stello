const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for CSV upload
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @route   POST /api/inventory/import-csv
// @desc    Import products from CSV file
// @access  Private (Manager/Admin)
router.post('/import-csv', [
  auth,
  upload.single('csvFile')
], async (req, res) => {
  // Check permissions
  if (!req.user.permissions.canManageInventory && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to manage inventory' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No CSV file uploaded' });
  }

  try {
    const results = [];
    const errors = [];
    let successCount = 0;
    let errorCount = 0;

    // Read CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Process each row
        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          try {
            // Validate required fields
            if (!row.name || !row.sku || !row.price || !row.cost) {
              errors.push({
                row: i + 2, // +2 because CSV is 1-indexed and we have header
                error: 'Missing required fields (name, sku, price, cost)'
              });
              errorCount++;
              continue;
            }

            // Check if product already exists
            const existingProduct = await Product.findOne({ sku: row.sku.toUpperCase() });
            if (existingProduct) {
              // Update existing product
              existingProduct.name = row.name;
              existingProduct.price = parseFloat(row.price);
              existingProduct.cost = parseFloat(row.cost);
              existingProduct.stock = parseInt(row.stock) || existingProduct.stock;
              existingProduct.category = row.category || existingProduct.category;
              existingProduct.description = row.description || existingProduct.description;
              existingProduct.lastUpdatedBy = req.user.id;

              await existingProduct.save();
              successCount++;
            } else {
              // Create new product
              const product = new Product({
                name: row.name,
                sku: row.sku.toUpperCase(),
                barcode: row.barcode || '',
                description: row.description || '',
                category: row.category || 'Other',
                price: parseFloat(row.price),
                cost: parseFloat(row.cost),
                stock: parseInt(row.stock) || 0,
                minStock: parseInt(row.minStock) || 5,
                maxStock: parseInt(row.maxStock) || null,
                unit: row.unit || 'piece',
                supplier: row.supplier ? {
                  name: row.supplier,
                  contact: row.supplierContact || '',
                  email: row.supplierEmail || ''
                } : null,
                tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
                createdBy: req.user.id,
                lastUpdatedBy: req.user.id
              });

              await product.save();
              successCount++;
            }
          } catch (err) {
            errors.push({
              row: i + 2,
              error: err.message
            });
            errorCount++;
          }
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({
          message: 'CSV import completed',
          summary: {
            total: results.length,
            success: successCount,
            errors: errorCount
          },
          errors: errors.length > 0 ? errors : undefined
        });
      })
      .on('error', (error) => {
        // Clean up uploaded file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error processing CSV file', error: error.message });
      });
  } catch (err) {
    // Clean up uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/inventory/adjust-stock
// @desc    Adjust product stock
// @access  Private (Manager/Admin)
router.post('/adjust-stock', [
  auth,
  body('productId').not().isEmpty(),
  body('quantity').isInt(),
  body('reason').not().isEmpty(),
  body('type').isIn(['add', 'subtract', 'set'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check permissions
  if (!req.user.permissions.canManageInventory && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to manage inventory' });
  }

  const { productId, quantity, reason, type, notes } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let newStock;
    switch (type) {
      case 'add':
        newStock = product.stock + quantity;
        break;
      case 'subtract':
        newStock = product.stock - quantity;
        if (newStock < 0) {
          return res.status(400).json({ message: 'Cannot reduce stock below 0' });
        }
        break;
      case 'set':
        newStock = quantity;
        if (newStock < 0) {
          return res.status(400).json({ message: 'Stock cannot be negative' });
        }
        break;
      default:
        return res.status(400).json({ message: 'Invalid adjustment type' });
    }

    const oldStock = product.stock;
    product.stock = newStock;
    product.lastUpdatedBy = req.user.id;

    await product.save();

    res.json({
      message: 'Stock adjusted successfully',
      product: {
        id: product._id,
        name: product.name,
        sku: product.sku,
        oldStock,
        newStock: product.stock,
        adjustment: type === 'add' ? `+${quantity}` : type === 'subtract' ? `-${quantity}` : `set to ${quantity}`
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/inventory/low-stock-report
// @desc    Get low stock report
// @access  Private
router.get('/low-stock-report', auth, async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$stock', '$minStock'] }
    }).populate('createdBy', 'name').sort({ stock: 1 });

    const report = {
      totalLowStock: products.length,
      outOfStock: products.filter(p => p.stock === 0).length,
      critical: products.filter(p => p.stock <= 2).length,
      products: products.map(p => ({
        id: p._id,
        name: p.name,
        sku: p.sku,
        currentStock: p.stock,
        minStock: p.minStock,
        category: p.category,
        supplier: p.supplier
      }))
    };

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/inventory/stock-movement
// @desc    Get stock movement report
// @access  Private
router.get('/stock-movement', auth, async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    // This would require a separate StockMovement model for detailed tracking
    // For now, we'll return a basic report
    const report = {
      period: {
        start: startDate,
        end: endDate
      },
      summary: {
        totalProducts: await Product.countDocuments(),
        lowStockProducts: await Product.countDocuments({
          $expr: { $lte: ['$stock', '$minStock'] }
        }),
        outOfStockProducts: await Product.countDocuments({ stock: 0 })
      }
    };

    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/inventory/export-csv
// @desc    Export products to CSV
// @access  Private
router.post('/export-csv', auth, async (req, res) => {
  try {
    const { category, status } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;

    const products = await Product.find(query).populate('createdBy', 'name');

    // Create CSV content
    const csvHeader = 'Name,SKU,Barcode,Description,Category,Price,Cost,Stock,MinStock,MaxStock,Unit,Supplier,Status\n';
    const csvContent = products.map(product => {
      return `"${product.name}","${product.sku}","${product.barcode || ''}","${product.description || ''}","${product.category}","${product.price}","${product.cost}","${product.stock}","${product.minStock}","${product.maxStock || ''}","${product.unit}","${product.supplier?.name || ''}","${product.status}"`;
    }).join('\n');

    const csvData = csvHeader + csvContent;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=products-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csvData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 