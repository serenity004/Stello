import React from 'react';

const Products = ({ showNotification }) => {
  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      model: 'HP-1001',
      sku: 'HP-1001',
      price: 199.99,
      stock: 24,
      status: 'in-stock',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      model: 'WM-2005',
      sku: 'WM-2005',
      price: 29.99,
      stock: 42,
      status: 'in-stock',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      model: 'BS-3002',
      sku: 'BS-3002',
      price: 89.99,
      stock: 3,
      status: 'low-stock',
      category: 'Electronics'
    },
    {
      id: 4,
      name: 'USB-C Cable',
      model: 'UC-4008',
      sku: 'UC-4008',
      price: 12.99,
      stock: 78,
      status: 'in-stock',
      category: 'Electronics'
    },
    {
      id: 5,
      name: 'Laptop Stand',
      model: 'LS-5003',
      sku: 'LS-5003',
      price: 39.99,
      stock: 0,
      status: 'out-of-stock',
      category: 'Electronics'
    }
  ];

  const getStockStatus = (product) => {
    if (product.status === 'out-of-stock') {
      return { class: 'bg-danger-100 text-danger-800', text: 'Out of Stock' };
    } else if (product.status === 'low-stock') {
      return { class: 'bg-warning-100 text-warning-800', text: `Low Stock: ${product.stock}` };
    } else {
      return { class: 'bg-success-100 text-success-800', text: `In Stock: ${product.stock}` };
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-secondary-900">Products</h3>
          <div className="mt-3 sm:mt-0">
            <div className="flex items-center">
              <div className="relative rounded-lg shadow-sm mr-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-secondary-400"></i>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                  placeholder="Search products"
                />
              </div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Groceries</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {products.map((product) => {
                const stockStatus = getStockStatus(product);
                
                return (
                  <tr key={product.id} className="hover:bg-neutral-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <i className="fas fa-box text-primary-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-secondary-900">{product.name}</div>
                          <div className="text-sm text-secondary-500">Model {product.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.class}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {product.category}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-lg text-secondary-700 bg-white hover:bg-neutral-50 transition-colors">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-lg text-secondary-700 bg-white hover:bg-neutral-50 transition-colors">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-secondary-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-neutral-300 bg-white text-sm font-medium text-secondary-500 hover:bg-neutral-50 transition-colors">
                  <span className="sr-only">Previous</span>
                  <i className="fas fa-chevron-left"></i>
                </a>
                <a href="#" aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg">
                  1
                </a>
                <a href="#" className="bg-white border-neutral-300 text-secondary-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors">
                  2
                </a>
                <a href="#" className="bg-white border-neutral-300 text-secondary-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors">
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-secondary-700 rounded-lg">
                  ...
                </span>
                <a href="#" className="bg-white border-neutral-300 text-secondary-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors">
                  5
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-neutral-300 bg-white text-sm font-medium text-secondary-500 hover:bg-neutral-50 transition-colors">
                  <span className="sr-only">Next</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 