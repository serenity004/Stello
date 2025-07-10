# Stello POS

A modern Point of Sale (POS) system built with React and Tailwind CSS.

## Features

- **Login System**: Secure authentication with email/password or access code
- **Dashboard**: Main POS interface with product search and cart management
- **Product Management**: Browse and search products with stock status
- **Transaction History**: View and manage past transactions
- **User Profile**: Manage personal settings and POS preferences
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Notifications**: Toast notifications for user feedback

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the POS directory:
   ```bash
   cd pos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
pos/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── NotificationToast.jsx
│   │   ├── POSInterface.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   ├── Sidebar.jsx
│   │   └── Transactions.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## Technologies Used

- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icons
- **Create React App**: Development environment

## Features in Detail

### Login System
- Email/password authentication
- Access code login option
- Secure session management

### Dashboard
- Product search and filtering
- Real-time cart management
- Checkout process
- Quick actions (discount, exchange, return, manager)

### Product Management
- Product catalog with stock status
- Search and filter functionality
- Stock level indicators

### Transaction History
- View past transactions
- Print receipts
- Process refunds
- Filter by date and staff

### User Profile
- Personal information management
- Password change functionality
- POS settings configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Stello business management system. 