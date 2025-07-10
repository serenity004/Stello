import React, { useState } from 'react';

const Dashboard = ({ showNotification }) => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Premium Headphones', price: 199.99, quantity: 2 },
    { id: 2, name: 'Wireless Mouse', price: 29.99, quantity: 1 },
  ]);

  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      sku: 'HP-1001',
      stock: 24,
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 29.99,
      sku: 'WM-2005',
      stock: 42,
      status: 'in-stock'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 89.99,
      sku: 'BS-3002',
      stock: 3,
      status: 'low-stock'
    },
    {
      id: 4,
      name: 'USB-C Cable',
      price: 12.99,
      sku: 'UC-4008',
      stock: 78,
      status: 'in-stock'
    },
    {
      id: 5,
      name: 'Laptop Stand',
      price: 39.99,
      sku: 'LS-5003',
      stock: 0,
      status: 'out-of-stock'
    }
  ];

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    showNotification('success', 'Item Added', `${product.name} has been added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showNotification('success', 'Item Removed', 'Item has been removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getStockStatus = (product) => {
    if (product.status === 'out-of-stock') {
      return { class: 'bg-danger-100 text-danger-800', text: 'Out of Stock' };
    } else if (product.status === 'low-stock') {
      return { class: 'bg-warning-100 text-warning-800', text: `Low Stock: ${product.stock}` };
    } else {
      return { class: 'bg-success-100 text-success-800', text: `In Stock: ${product.stock}` };
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Product Search and List */}
        <div className="lg:w-2/5">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-secondary-400"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                placeholder="Search by name or scan barcode"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-secondary-900">Products</h3>
              <div className="flex items-center">
                <span className="text-sm text-secondary-500 mr-2">Filter:</span>
                <select className="block w-full pl-3 pr-10 py-1 text-base border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Groceries</option>
                </select>
              </div>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
              <ul className="divide-y divide-neutral-200">
                {products.map((product) => {
                  const stockStatus = getStockStatus(product);
                  const isOutOfStock = product.status === 'out-of-stock';
                  
                  return (
                    <li key={product.id} className="px-4 py-3 hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <i className="fas fa-box text-primary-600"></i>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-secondary-900">{product.name}</p>
                            <p className="text-sm font-bold text-secondary-900">${product.price}</p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-secondary-500">SKU: {product.sku}</p>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.class}`}>
                              {stockStatus.text}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <div className="flex items-center">
                          <button
                            className={`quantity-btn minus bg-neutral-200 px-2 py-1 rounded-l-lg hover:bg-neutral-300 transition-colors ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isOutOfStock}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            className={`w-12 text-center border-t border-b border-neutral-300 py-1 ${isOutOfStock ? 'opacity-50' : ''}`}
                            disabled={isOutOfStock}
                          />
                          <button
                            className={`quantity-btn plus bg-neutral-200 px-2 py-1 rounded-r-lg hover:bg-neutral-300 transition-colors ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isOutOfStock}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button
                            onClick={() => !isOutOfStock && addToCart(product, 1)}
                            className={`ml-2 px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                              isOutOfStock 
                                ? 'bg-neutral-400 text-white cursor-not-allowed' 
                                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                            }`}
                            disabled={isOutOfStock}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right Column - Cart and Checkout */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
              <h3 className="text-lg font-medium text-secondary-900">Current Sale</h3>
            </div>
            
            <div className="divide-y divide-neutral-200" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} className="px-4 py-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-secondary-900">{item.name}</p>
                      <p className="text-sm text-secondary-500">${item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-4 text-secondary-900">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-danger-500 hover:text-danger-700 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-t border-neutral-200">
              <div className="flex justify-between py-1">
                <span className="text-secondary-600">Subtotal:</span>
                <span className="font-medium text-secondary-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-secondary-600">Tax (8%):</span>
                <span className="font-medium text-secondary-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <div className="flex items-center">
                  <span className="text-secondary-600 mr-2">Discount:</span>
                  <button className="text-primary-600 hover:text-primary-800 text-sm transition-colors">
                    <i className="fas fa-plus-circle mr-1"></i> Add
                  </button>
                </div>
                <span className="font-medium text-secondary-900">$0.00</span>
              </div>
              <div className="flex justify-between py-3 border-t border-neutral-200 mt-2">
                <span className="text-lg font-bold text-secondary-900">Total:</span>
                <span className="text-lg font-bold text-secondary-900">${total.toFixed(2)}</span>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
                  <i className="fas fa-credit-card mr-2"></i> Checkout
                </button>
                <button className="bg-neutral-200 text-secondary-800 py-3 px-4 rounded-lg font-medium hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-all duration-200">
                  <i className="fas fa-print mr-2"></i> Hold
                </button>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-2">
                <button className="bg-neutral-100 text-secondary-800 py-2 px-3 rounded-lg font-medium hover:bg-neutral-200 text-sm transition-colors">
                  <i className="fas fa-envelope mr-1"></i> Email
                </button>
                <button className="bg-neutral-100 text-secondary-800 py-2 px-3 rounded-lg font-medium hover:bg-neutral-200 text-sm transition-colors">
                  <i className="fas fa-print mr-1"></i> Print
                </button>
                <button className="bg-neutral-100 text-secondary-800 py-2 px-3 rounded-lg font-medium hover:bg-neutral-200 text-sm transition-colors">
                  <i className="fas fa-trash-alt mr-1"></i> Clear
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            <button className="bg-white shadow-sm border border-neutral-200 rounded-lg p-3 text-center hover:bg-neutral-50 transition-colors">
              <i className="fas fa-percentage text-xl text-primary-600 mb-1"></i>
              <p className="text-xs text-secondary-600">Discount</p>
            </button>
            <button className="bg-white shadow-sm border border-neutral-200 rounded-lg p-3 text-center hover:bg-neutral-50 transition-colors">
              <i className="fas fa-exchange-alt text-xl text-primary-600 mb-1"></i>
              <p className="text-xs text-secondary-600">Exchange</p>
            </button>
            <button className="bg-white shadow-sm border border-neutral-200 rounded-lg p-3 text-center hover:bg-neutral-50 transition-colors">
              <i className="fas fa-undo text-xl text-primary-600 mb-1"></i>
              <p className="text-xs text-secondary-600">Return</p>
            </button>
            <button className="bg-white shadow-sm border border-neutral-200 rounded-lg p-3 text-center hover:bg-neutral-50 transition-colors">
              <i className="fas fa-key text-xl text-primary-600 mb-1"></i>
              <p className="text-xs text-secondary-600">Manager</p>
            </button>
          </div>
          
          {/* Customer Info */}
          <div className="mt-4 bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-secondary-900">Customer</h4>
              <button className="text-primary-600 hover:text-primary-800 text-sm transition-colors">
                <i className="fas fa-plus-circle mr-1"></i> Add
              </button>
            </div>
            <p className="text-sm text-secondary-500">No customer selected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 