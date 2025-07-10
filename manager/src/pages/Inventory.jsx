import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  Search, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { useCurrency } from '../contexts/CurrencyContext';

const Inventory = () => {
  const { formatCurrency } = useCurrency();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Items');
  const [sortBy, setSortBy] = useState('Name (A-Z)');

  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      sku: 'PRD-001',
      category: 'Electronics',
      quantity: 24,
      costPrice: 45.00,
      sellingPrice: 99.00,
      profit: 54.00,
      image: 'https://via.placeholder.com/40'
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      sku: 'PRD-002',
      category: 'Electronics',
      quantity: 56,
      costPrice: 12.50,
      sellingPrice: 29.99,
      profit: 17.49,
      image: 'https://via.placeholder.com/40'
    },
    {
      id: 3,
      name: 'Cotton T-Shirt',
      sku: 'PRD-003',
      category: 'Clothing',
      quantity: 5,
      costPrice: 8.00,
      sellingPrice: 19.99,
      profit: 11.99,
      image: 'https://via.placeholder.com/40'
    }
  ];

  const categories = ['All Categories', 'Electronics', 'Clothing', 'Home & Garden'];
  const statusOptions = ['All Items', 'In Stock', 'Low Stock', 'Out of Stock'];
  const sortOptions = [
    'Name (A-Z)',
    'Name (Z-A)',
    'Price (Low-High)',
    'Price (High-Low)',
    'Stock (Low-High)',
    'Stock (High-Low)'
  ];

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity <= 5) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="secondary" size="sm">
            <Upload className="w-4 h-4 mr-1" />
            Import
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Stock Status</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Sort By</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Cost Price
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Selling Price
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-3 lg:px-6 py-3 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {products.map((product) => {
                const stockStatus = getStockStatus(product.quantity);
                return (
                  <tr key={product.id} className="table-row">
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
                          <img className="h-8 w-8 lg:h-10 lg:w-10 rounded" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-2 lg:ml-4">
                          <div className="text-sm font-medium text-secondary-800">{product.name}</div>
                          <div className="text-xs lg:text-sm text-secondary-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {product.sku}
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                        {product.quantity}
                      </span>
                    </td>
                                         <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                       {formatCurrency(product.costPrice)}
                     </td>
                     <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                       {formatCurrency(product.sellingPrice)}
                     </td>
                     <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                       {formatCurrency(product.profit)}
                     </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-secondary-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
          <span className="font-medium">24</span> results
        </div>
        <div className="flex space-x-1">
          <Button variant="secondary" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="primary" size="sm">1</Button>
          <Button variant="secondary" size="sm">2</Button>
          <Button variant="secondary" size="sm">3</Button>
          <Button variant="secondary" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <Input type="text" placeholder="Enter product name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <Input type="text" placeholder="Enter SKU" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
              <Input type="number" step="0.01" placeholder="0.00" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
              <Input type="number" step="0.01" placeholder="0.00" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <Input type="number" placeholder="0" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              rows="3" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => setIsAddProductModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory; 