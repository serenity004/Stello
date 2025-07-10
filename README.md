# Stello Business Management System

A comprehensive business management solution with two main applications: **POS (Point of Sale)** and **Manager (Business Management Dashboard)**.

## Project Structure

```
Stello/
├── pos/                    # Point of Sale Application
│   ├── src/
│   │   ├── components/     # POS React components
│   │   ├── App.jsx        # Main POS app
│   │   └── index.js       # POS entry point
│   ├── public/            # POS public assets
│   ├── package.json       # POS dependencies
│   └── README.md          # POS documentation
├── manager/               # Business Management Dashboard
│   ├── src/
│   │   ├── components/    # Manager React components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Manager pages
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main manager app
│   │   └── index.js       # Manager entry point
│   ├── public/            # Manager public assets
│   ├── package.json       # Manager dependencies
│   └── README.md          # Manager documentation
└── README.md              # This file
```

## Applications

### 1. POS (Point of Sale)
**Location**: `pos/`

A modern point of sale system for retail operations.

**Features**:
- User authentication (email/password or access code)
- Product search and catalog management
- Real-time cart and checkout functionality
- Transaction history and receipt printing
- User profile and POS settings
- Responsive design for desktop and mobile

**Technologies**:
- React 18
- Tailwind CSS
- Font Awesome icons

**Quick Start**:
```bash
cd pos
npm install
npm start
```

### 2. Manager (Business Management Dashboard)
**Location**: `manager/`

A comprehensive business management dashboard with AI-powered features.

**Features**:
- Dashboard with business analytics
- Inventory management
- Sales tracking and reporting
- Team management
- AI-powered assistant and analytics
- Smart product categorization
- Settings and notifications

**Technologies**:
- React 18
- Tailwind CSS
- AI integration features

**Quick Start**:
```bash
cd manager
npm install
npm start
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Stello
   ```

2. **Install POS dependencies**:
   ```bash
   cd pos
   npm install
   ```

3. **Install Manager dependencies**:
   ```bash
   cd ../manager
   npm install
   ```

### Running the Applications

**POS Application**:
```bash
cd pos
npm start
# Open http://localhost:3000
```

**Manager Application**:
```bash
cd manager
npm start
# Open http://localhost:3001 (or next available port)
```

## Development

### POS Development
- Navigate to `pos/` directory
- Run `npm start` for development
- Run `npm run build` for production build

### Manager Development
- Navigate to `manager/` directory
- Run `npm start` for development
- Run `npm run build` for production build

## Features Overview

### POS System
- **Authentication**: Secure login with multiple options
- **Product Management**: Search, filter, and manage inventory
- **Sales Processing**: Add items to cart, process payments
- **Transaction History**: View and manage past sales
- **User Management**: Profile settings and preferences

### Manager Dashboard
- **Business Analytics**: Real-time business metrics
- **Inventory Management**: Stock tracking and alerts
- **Sales Management**: Sales reports and analytics
- **Team Management**: Staff and role management
- **AI Features**: 
  - AI Assistant for business insights
  - AI Analytics for predictions
  - Smart Product Categorization
- **Settings**: System configuration and preferences

## Architecture

Both applications follow modern React patterns:
- **Component-based architecture**
- **Hooks for state management**
- **Context API for global state**
- **Responsive design with Tailwind CSS**
- **Modular component structure**

## Contributing

1. Fork the repository
2. Create a feature branch for your changes
3. Make your changes in the appropriate application directory
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Stello business management system.

## Support

For support or questions:
- Check the individual README files in `pos/` and `manager/` directories
- Review the component documentation
- Test both applications thoroughly before deployment 