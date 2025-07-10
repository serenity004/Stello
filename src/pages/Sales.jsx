import React, { useState } from 'react';
import { 
  Download, 
  Plus, 
  Eye, 
  Printer,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useCurrency } from '../contexts/CurrencyContext';

const Sales = () => {
  const { formatCurrency } = useCurrency();
  const [selectedPeriod, setSelectedPeriod] = useState('Month');

  const salesData = [
    {
      id: 'ORD-1001',
      date: 'Jun 12, 2023',
      customer: 'John Smith',
      items: 3,
      total: 148.97,
      status: 'Completed'
    },
    {
      id: 'ORD-1002',
      date: 'Jun 10, 2023',
      customer: 'Jane Doe',
      items: 1,
      total: 99.00,
      status: 'Completed'
    },
    {
      id: 'ORD-1003',
      date: 'Jun 8, 2023',
      customer: 'Mike Johnson',
      items: 2,
      total: 49.98,
      status: 'Pending'
    }
  ];

  const periods = ['Day', 'Week', 'Month', 'Year'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-secondary">Sales</h1>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            New Sale
          </Button>
        </div>
      </div>

      {/* Sales Graph */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary">Sales Overview</h2>
          <div className="flex space-x-2">
            {periods.map(period => (
              <Button
                key={period}
                size="sm"
                variant={selectedPeriod === period ? 'primary' : 'secondary'}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <TrendingUp className="w-12 h-12 mx-auto mb-2" />
            <p>Sales chart will appear here</p>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((sale) => (
                <tr key={sale.id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                    {sale.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.items}
                  </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {formatCurrency(sale.total)}
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Printer className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
          <span className="font-medium">15</span> results
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
    </div>
  );
};

export default Sales; 