import React from 'react';

const Header = ({ onLogout, sidebarOpen, setSidebarOpen, userMenuOpen, setUserMenuOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
              <i className="fas fa-cash-register text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-secondary-800">Stello POS</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="ml-4 flex items-center md:ml-6">
            <button className="p-2 rounded-lg text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors relative">
              <span className="sr-only">View notifications</span>
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500 shadow-sm"></span>
            </button>
            
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="max-w-xs bg-white flex items-center text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-2 hover:bg-neutral-50 transition-colors"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center shadow-sm">
                    <span className="text-secondary-100 font-medium text-sm">JD</span>
                  </div>
                  <span className="ml-2 text-secondary-700 font-medium hidden md:inline">John Doe</span>
                  <i className="fas fa-chevron-down ml-2 text-secondary-400 text-xs"></i>
                </button>
              </div>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-neutral-200">
                  <a href="#" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50 transition-colors">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50 transition-colors">Settings</a>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 