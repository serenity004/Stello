import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useCurrency } from '../contexts/CurrencyContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'currency', name: 'Currency', icon: DollarSign }
  ];

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center shadow-sm">
          <span className="text-white font-semibold text-xl">JD</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-800">John Doe</h3>
          <p className="text-secondary-500">john.doe@stello.com</p>
          <Button variant="secondary" size="sm" className="mt-2">
            Change Photo
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">First Name</label>
          <input 
            type="text" 
            defaultValue="John"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Last Name</label>
          <input 
            type="text" 
            defaultValue="Doe"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
          <input 
            type="email" 
            defaultValue="john.doe@stello.com"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Phone</label>
          <input 
            type="tel" 
            defaultValue="+1 (555) 123-4567"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h4 className="font-medium text-secondary-800">Email Notifications</h4>
            <p className="text-sm text-secondary-500">Receive notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifications.email}
              onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h4 className="font-medium text-secondary-800">Push Notifications</h4>
            <p className="text-sm text-secondary-500">Receive push notifications in browser</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifications.push}
              onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h4 className="font-medium text-secondary-800">SMS Notifications</h4>
            <p className="text-sm text-secondary-500">Receive notifications via SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifications.sms}
              onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 border border-neutral-200 rounded-lg">
          <h4 className="font-medium text-secondary-800 mb-2">Change Password</h4>
          <div className="space-y-3">
            <input 
              type="password" 
              placeholder="Current Password"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input 
              type="password" 
              placeholder="New Password"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input 
              type="password" 
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button variant="primary" size="sm">
              Update Password
            </Button>
          </div>
        </div>
        
        <div className="p-4 border border-neutral-200 rounded-lg">
          <h4 className="font-medium text-secondary-800 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-secondary-500 mb-3">Add an extra layer of security to your account</p>
          <Button variant="secondary" size="sm">
            Enable 2FA
          </Button>
        </div>
      </div>
    </div>
  );

  const AppearanceTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 border border-neutral-200 rounded-lg">
          <h4 className="font-medium text-secondary-800 mb-2">Theme</h4>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-primary-500 text-primary-600 rounded-md">
              Light
            </button>
            <button className="px-4 py-2 border border-neutral-300 text-secondary-700 rounded-md">
              Dark
            </button>
            <button className="px-4 py-2 border border-neutral-300 text-secondary-700 rounded-md">
              Auto
            </button>
          </div>
        </div>
        
        <div className="p-4 border border-neutral-200 rounded-lg">
          <h4 className="font-medium text-secondary-800 mb-2">Language</h4>
          <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-secondary mb-2">Time Zone</h4>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC+0 (GMT)</option>
            <option>UTC+1 (Central European Time)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const CurrencyTab = () => {
    const { currency, currencies, updateCurrency } = useCurrency();
    
    return (
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-secondary mb-4">Select Currency</h4>
          <p className="text-sm text-gray-500 mb-4">
            Choose your preferred currency. This will be used throughout the application for all monetary values.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => updateCurrency(curr.code)}
                className={`p-3 border-2 rounded-lg text-left transition-colors flex items-center justify-between group ${
                  currency === curr.code
                    ? 'border-primary-600 bg-primary-50 text-primary-800 shadow-md'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/40'
                }`}
              >
                <div>
                  <div className="font-medium">{curr.name}</div>
                  <div className="text-sm text-gray-500">{curr.code}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{curr.symbol}</span>
                  {currency === curr.code && (
                    <CheckCircle className="w-5 h-5 text-primary-600 ml-2" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-secondary mb-2">Preview</h4>
          <p className="text-sm text-gray-600">
            Sample values with selected currency: <span className="font-medium">$1,234.56</span>
          </p>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'security':
        return <SecurityTab />;
      case 'appearance':
        return <AppearanceTab />;
      case 'currency':
        return <CurrencyTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50 border border-transparent hover:border-primary-200'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="glass-card p-6 rounded-xl">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 