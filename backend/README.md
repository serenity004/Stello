# Stello Backend API

A comprehensive backend API for the Stello POS and Manager applications, providing inventory management, transaction processing, and user authentication.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based permissions
- **Product Management**: CRUD operations for products with stock tracking
- **Transaction Processing**: Sales, returns, and refunds with automatic stock updates
- **Inventory Management**: Stock adjustments, low stock alerts, and CSV import/export
- **Reporting**: Sales reports, inventory reports, and analytics
- **CSV Integration**: Bulk import/export of products for inventory management

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **csv-parser** - CSV file processing

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your configuration

4. **Install MongoDB**
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas for cloud hosting

5. **Start the server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Admin/Manager)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with pagination/filtering)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/search/barcode/:barcode` - Search by barcode
- `GET /api/products/search/sku/:sku` - Search by SKU
- `GET /api/products/low-stock` - Get low stock products

### Transactions
- `POST /api/transactions/sale` - Create sale transaction
- `POST /api/transactions/return` - Create return transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `PUT /api/transactions/:id/void` - Void transaction
- `GET /api/transactions/reports/sales` - Sales report

### Inventory
- `POST /api/inventory/import-csv` - Import products from CSV
- `POST /api/inventory/adjust-stock` - Adjust product stock
- `GET /api/inventory/low-stock-report` - Low stock report
- `GET /api/inventory/stock-movement` - Stock movement report
- `POST /api/inventory/export-csv` - Export products to CSV

## Database Schema

### User Model
- Authentication fields (email, password)
- Role-based permissions
- Account security (login attempts, lockout)

### Product Model
- Product information (name, SKU, barcode, description)
- Pricing (price, cost)
- Inventory (stock, min/max stock)
- Categorization and metadata

### Transaction Model
- Transaction details (type, items, totals)
- Payment information
- Customer data
- Audit trail

## CSV Import Format

The CSV import expects the following columns:
- `name` - Product name (required)
- `sku` - Stock keeping unit (required)
- `barcode` - Product barcode (optional)
- `description` - Product description (optional)
- `category` - Product category (optional)
- `price` - Selling price (required)
- `cost` - Product cost (required)
- `stock` - Current stock quantity (optional)
- `minStock` - Minimum stock level (optional)
- `maxStock` - Maximum stock level (optional)
- `unit` - Unit of measurement (optional)
- `supplier` - Supplier name (optional)
- `supplierContact` - Supplier contact (optional)
- `supplierEmail` - Supplier email (optional)
- `tags` - Comma-separated tags (optional)

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Express-validator for data validation
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers

## Development

```bash
# Start development server with nodemon
npm run dev

# Run tests
npm test

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/stello |
| `JWT_SECRET` | JWT signing secret | your-secret-key |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:3000,http://localhost:3001 |

## Integration with Frontend Apps

### POS App (Port 3000)
- Real-time product search
- Transaction processing
- Stock validation
- Receipt generation

### Manager App (Port 3001)
- Product management
- Inventory reports
- CSV import/export
- User management
- Sales analytics

## License

MIT License - see LICENSE file for details 