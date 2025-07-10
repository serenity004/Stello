import React from 'react';

const Transactions = ({ showNotification }) => {
  const transactions = [
    {
      id: 'TXN-2023-0567',
      date: 'May 15, 2023 10:42 AM',
      items: 3,
      amount: 429.97,
      staff: 'John Doe'
    },
    {
      id: 'TXN-2023-0566',
      date: 'May 15, 2023 9:15 AM',
      items: 1,
      amount: 89.99,
      staff: 'Jane Smith'
    },
    {
      id: 'TXN-2023-0565',
      date: 'May 14, 2023 4:30 PM',
      items: 5,
      amount: 256.45,
      staff: 'John Doe'
    }
  ];

  const handleRefund = (transactionId) => {
    showNotification('info', 'Refund', `Refund modal would open for transaction ${transactionId}`);
  };

  const handlePrint = (transactionId) => {
    showNotification('success', 'Print', `Printing receipt for transaction ${transactionId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-secondary-900">Transaction History</h3>
          <div className="mt-3 sm:mt-0">
            <div className="flex items-center">
              <div className="relative rounded-lg shadow-sm mr-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-calendar text-secondary-400"></i>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                  placeholder="Date range"
                />
              </div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg">
                <option>All Staff</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Staff
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                    #{transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {transaction.items} {transaction.items === 1 ? 'item' : 'items'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {transaction.staff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handlePrint(transaction.id)}
                      className="text-primary-600 hover:text-primary-900 mr-3 transition-colors"
                    >
                      <i className="fas fa-print"></i>
                    </button>
                    <button
                      onClick={() => handleRefund(transaction.id)}
                      className="text-danger-600 hover:text-danger-900 transition-colors"
                    >
                      <i className="fas fa-undo"></i>
                    </button>
                  </td>
                </tr>
              ))}
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> results
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
                  8
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

export default Transactions; 