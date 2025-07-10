# Stello - Inventory Management System

A modern, professional React-based inventory management system with a beautiful UI and comprehensive features.

## Features

- **Dashboard**: Overview with key metrics, sales performance charts, and recent activities
- **Inventory Management**: Product catalog with filtering, sorting, and bulk operations
- **Sales Tracking**: Sales history, order management, and performance analytics
- **Team Management**: User roles, permissions, and collaboration tools
- **Settings**: Store configuration, subscription management, and data export
- **Authentication**: Secure login system with session management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Context API** - State management for authentication
- **Custom Hooks** - Reusable logic and state management

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stello-inventory
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

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       └── Modal.jsx
├── contexts/
│   └── AuthContext.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Inventory.jsx
│   ├── Sales.jsx
│   ├── Settings.jsx
│   └── Team.jsx
├── utils/
│   └── cn.js
├── App.jsx
├── index.js
└── index.css
```

## Key Components

### Authentication
- **LoginForm**: Professional login interface with validation
- **AuthContext**: Manages authentication state across the app
- **ProtectedRoute**: Guards routes requiring authentication

### Layout Components
- **Sidebar**: Collapsible navigation with user profile
- **Header**: Top navigation with notifications and user menu

### UI Components
- **Button**: Reusable button with multiple variants and sizes
- **Input**: Form input with error handling and styling
- **Modal**: Reusable modal component with backdrop

### Pages
- **Dashboard**: Overview with metrics and charts
- **Inventory**: Product management with filtering and search
- **Sales**: Sales tracking and order management
- **Team**: User management and role assignment
- **Settings**: Configuration and data export

## Styling

The application uses Tailwind CSS with custom configurations:

- **Custom Colors**: Primary, secondary, accent, and semantic colors
- **Custom Components**: Glass cards, buttons, and form elements
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and hover effects

## Features in Detail

### Dashboard
- Summary cards with key metrics
- Sales performance charts
- Recent activity feed
- Low stock alerts
- Quick action buttons

### Inventory Management
- Product catalog with images and details
- Advanced filtering and search
- Stock level tracking
- Cost and profit calculations
- Bulk operations support

### Sales Tracking
- Order history and details
- Sales performance analytics
- Customer information
- Payment status tracking
- Export capabilities

### Team Management
- User role assignment
- Permission-based access
- Team member invitations
- Activity tracking
- Profile management

### Settings
- Store information configuration
- Subscription management
- Data export options
- Security settings
- Business preferences

## Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Add navigation item in `src/components/layout/Sidebar.jsx`

### Styling Customization
- Modify `tailwind.config.js` for theme changes
- Update `src/index.css` for custom component styles
- Use the `cn()` utility for conditional classes

### Adding New Features
- Create reusable components in `src/components/ui/`
- Add context providers for state management
- Implement custom hooks for reusable logic

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository. 