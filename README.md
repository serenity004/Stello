# Stello - Complete Business Management System

A comprehensive business management system with Point of Sale (POS) and Manager applications, integrated with a powerful backend API for inventory management and transaction processing.

## 🏗️ Architecture

```
Stello/
├── backend/          # Node.js/Express API server
├── manager/          # React Manager Dashboard (Port 3001)
├── pos/             # React POS System (Port 3000)
├── start.bat        # Windows startup script
└── start.sh         # Unix startup script
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and setup backend**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your MongoDB connection
   npm run dev
   ```

2. **Setup Manager App**
   ```bash
   cd manager
   npm install
   npm start
   ```

3. **Setup POS App**
   ```bash
   cd pos
   npm install
   npm start
   ```

### Using Startup Scripts

**Windows:**
```bash
start.bat
```

**Unix/Mac:**
```bash
./start.sh
```

## 📱 Applications

### 🛒 POS System (Port 3000)
- **Real-time Sales Processing**: Scan barcodes, search products, process payments
- **Inventory Integration**: Automatic stock updates on sales
- **Customer Management**: Track customer information and loyalty
- **Receipt Generation**: Print or email receipts
- **Returns & Refunds**: Process returns with automatic stock restoration

### 📊 Manager Dashboard (Port 3001)
- **Inventory Management**: Add, edit, and manage products
- **CSV Import/Export**: Bulk product management
- **Sales Analytics**: Real-time sales reports and trends
- **User Management**: Manage staff accounts and permissions
- **Stock Alerts**: Low stock notifications and reorder suggestions
- **AI Features**: Smart product categorization and analytics

### 🔧 Backend API (Port 5000)
- **Authentication**: JWT-based security with role-based access
- **Database Management**: MongoDB with Mongoose ODM
- **Transaction Processing**: Sales, returns, and inventory updates
- **CSV Processing**: Bulk import/export functionality
- **Reporting**: Comprehensive analytics and reporting APIs

## 🔄 Data Flow

### Sales Process
1. **POS** → Searches products via API
2. **API** → Validates stock availability
3. **POS** → Creates sale transaction
4. **API** → Updates inventory automatically
5. **Manager** → Views updated inventory and sales reports

### Inventory Management
1. **Manager** → Uploads CSV with new products
2. **API** → Processes and validates data
3. **Database** → Updates product catalog
4. **POS** → Immediately sees new products
5. **Manager** → Monitors stock levels and sales

## 🛠️ Features

### POS System
- ✅ Product search by name, SKU, or barcode
- ✅ Real-time stock validation
- ✅ Multiple payment methods
- ✅ Customer information capture
- ✅ Receipt generation
- ✅ Returns and refunds
- ✅ Transaction history
- ✅ User authentication

### Manager Dashboard
- ✅ Product CRUD operations
- ✅ CSV import/export
- ✅ Inventory reports
- ✅ Sales analytics
- ✅ User management
- ✅ Stock alerts
- ✅ AI-powered insights
- ✅ Role-based permissions

### Backend API
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS protection
- ✅ MongoDB integration

## 📊 Database Schema

### Products
```javascript
{
  name: String,
  sku: String (unique),
  barcode: String,
  price: Number,
  cost: Number,
  stock: Number,
  minStock: Number,
  category: String,
  supplier: Object,
  status: String
}
```

### Transactions
```javascript
{
  transactionId: String,
  type: String (sale/return),
  items: Array,
  total: Number,
  paymentMethod: String,
  customer: Object,
  cashier: ObjectId
}
```

### Users
```javascript
{
  name: String,
  email: String,
  role: String,
  permissions: Object,
  isActive: Boolean
}
```

## 🔐 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Role-based Access**: Granular permissions system
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: Protection against abuse
- **CORS Protection**: Secure cross-origin requests

## 📈 CSV Integration

### Import Format
```csv
name,sku,price,cost,stock,category,description
Premium Headphones,HP-1001,199.99,120.00,24,Electronics,High-quality wireless headphones
```

### Export Features
- Product catalog export
- Sales reports export
- Inventory reports export
- Custom date range exports

## 🚀 Deployment

### Development
```bash
# Backend
cd backend && npm run dev

# Manager
cd manager && npm start

# POS
cd pos && npm start
```

### Production
```bash
# Backend
cd backend && npm start

# Manager
cd manager && npm run build
# Serve build folder

# POS
cd pos && npm run build
# Serve build folder
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stello
JWT_SECRET=your-secret-key
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Check the documentation in each app's README
- Review the API documentation in `backend/README.md`
- Open an issue for bugs or feature requests

---

**Stello** - Complete Business Management System 