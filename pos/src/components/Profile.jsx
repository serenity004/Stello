import React from 'react';

const Profile = ({ showNotification }) => {
  const handleSave = () => {
    showNotification('success', 'Profile Updated', 'Your profile has been successfully updated');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
          <h3 className="text-lg font-medium text-secondary-900">My Profile</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center shadow-lg mb-4">
                  <span className="text-secondary-100 font-bold text-4xl">JD</span>
                </div>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
                  Change Photo
                </button>
              </div>
            </div>
            
            {/* Profile Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="John"
                      className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="Doe"
                      className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="john.doe@stello.com"
                    className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-secondary-700 mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    defaultValue="cashier"
                    className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                  >
                    <option value="cashier">Cashier</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    defaultValue="123 Main Street, City, State 12345"
                    className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Settings */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
          <h3 className="text-lg font-medium text-secondary-900">Security Settings</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-secondary-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-secondary-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-colors"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => showNotification('success', 'Password Updated', 'Your password has been successfully updated')}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 