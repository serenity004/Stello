import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  UserPlus,
  Plus,
  FileText,
  Download,
  Zap,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';
import { useCurrency } from '../contexts/CurrencyContext';

const Dashboard = () => {
  const { formatCurrency } = useCurrency();
  const navigate = useNavigate();
  
  const summaryCards = [
    {
      title: 'Total Stock Value',
      value: formatCurrency(24589),
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-gradient-to-br from-primary-100 to-primary-200',
      iconColor: 'text-primary-600'
    },
    {
      title: 'Monthly Sales',
      value: formatCurrency(8742),
      change: '+8%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-success-100 to-success-200',
      iconColor: 'text-success-600'
    },
    {
      title: 'Profit',
      value: formatCurrency(3856),
      change: '-2%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-warning-100 to-warning-200',
      iconColor: 'text-warning-600'
    },
    {
      title: 'Out of Stock',
      value: '14',
      change: 'Needs attention',
      changeType: 'warning',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-danger-100 to-danger-200',
      iconColor: 'text-danger-600'
    }
  ];

  const recentActivities = [
    {
      user: 'John Doe',
      action: 'added 12 items to POS store',
      time: '2 hours ago',
      avatar: 'JD'
    },
    {
      user: 'Sarah Miller',
      action: 'updated product prices',
      time: '5 hours ago',
      avatar: 'SM'
    },
    {
      user: 'Robert Johnson',
      action: 'processed 3 sales',
      time: 'Yesterday',
      avatar: 'RJ'
    },
    {
      user: 'Alex Morgan',
      action: 'exported inventory report',
      time: 'Yesterday',
      avatar: 'AM'
    }
  ];

  const lowStockItems = [
    {
      name: 'Premium Headphones',
      sku: 'PH-2023',
      stock: 2,
      status: 'critical'
    },
    {
      name: 'Wireless Mouse',
      sku: 'WM-4567',
      stock: 3,
      status: 'critical'
    },
    {
      name: 'Bluetooth Speaker',
      sku: 'BS-7890',
      stock: 5,
      status: 'warning'
    },
    {
      name: 'USB-C Cable',
      sku: 'UC-1234',
      stock: 1,
      status: 'critical'
    }
  ];

  const aiInsights = [
    {
      title: 'Sales Forecast',
      description: 'Expected 12% increase in sales next month',
      icon: TrendingUp,
      color: 'text-success',
      action: 'View Details'
    },
    {
      title: 'Inventory Alert',
      description: '4 products need immediate reordering',
      icon: AlertTriangle,
      color: 'text-warning',
      action: 'Reorder Now'
    },
    {
      title: 'Profit Optimization',
      description: 'Electronics category shows highest profit margins',
      icon: Lightbulb,
      color: 'text-primary',
      action: 'Optimize Pricing'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-500">{card.title}</p>
                  <h3 className="text-2xl font-bold text-secondary-800 mt-1">{card.value}</h3>
                  <p className={cn(
                    "text-xs mt-1 flex items-center",
                    card.changeType === 'positive' ? 'text-success' : 
                    card.changeType === 'negative' ? 'text-danger' : 'text-warning'
                  )}>
                    {card.changeType === 'positive' ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : card.changeType === 'negative' ? (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 mr-1" />
                    )}
                    {card.change}
                  </p>
                </div>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", card.color)}>
                  <Icon className={cn("text-xl", card.iconColor)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Chart and Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary">Sales Performance</h2>
            <div className="flex space-x-2">
              <Button size="sm" variant="primary">Monthly</Button>
              <Button size="sm" variant="secondary">Weekly</Button>
              <Button size="sm" variant="secondary">Daily</Button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-center">
            <div className="text-center text-secondary-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-2" />
              <p>Sales chart will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-secondary mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full" variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button className="w-full" variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button className="w-full" variant="secondary">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Teammate
            </Button>
            <Button className="w-full" variant="secondary">
              <FileText className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity & Low Stock */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-secondary mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center mr-3 shadow-sm">
                  <span className="text-white font-medium text-sm">{activity.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-800">
                    {activity.user} {activity.action}
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4">
            View All Activity
          </Button>
        </div>
        
        {/* Low Stock Items */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary">Low Stock Items</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockItems.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {item.sku}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        item.status === 'critical' ? 'text-danger' : 'text-warning'
                      )}>
                        {item.stock} left
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">Reorder</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-secondary">AI Insights</h2>
            <p className="text-sm text-secondary-500">Powered by artificial intelligence</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg border border-neutral-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm`}>
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-800">{insight.title}</h3>
                    <p className="text-sm text-secondary-600">{insight.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  {insight.action}
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex items-center justify-center">
          <Button 
            variant="secondary" 
            className="flex items-center space-x-2"
            onClick={() => navigate('/ai')}
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore More AI Features</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 