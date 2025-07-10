import React from 'react';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { id: 'transactions', label: 'Transactions', icon: 'fas fa-receipt' },
    { id: 'products', label: 'Products', icon: 'fas fa-boxes' },
    { id: 'profile', label: 'My Profile', icon: 'fas fa-user' },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:flex lg:flex-shrink-0 fixed lg:relative inset-y-0 left-0 z-50`}>
        <div className="flex flex-col w-64 bg-gradient-to-r from-neutral-50 to-neutral-100 border-r border-neutral-200">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-primary-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
                  <i className="fas fa-cash-register text-white text-sm"></i>
                </div>
                <span className="text-xl font-bold text-secondary-800">Stello</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`${
                    activeSection === item.id
                      ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500 shadow-sm'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50 border-l-4 border-transparent'
                  } group flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 w-full text-left`}
                >
                  <i className={`${item.icon} ${
                    activeSection === item.id ? 'text-primary-500' : 'text-secondary-400 group-hover:text-primary-500'
                  } mr-3 flex-shrink-0`}></i>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* User Profile */}
          <div className="flex-shrink-0 flex border-t border-neutral-200 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center shadow-sm">
                <span className="text-secondary-100 font-medium text-sm">JD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-800">John Doe</p>
                <button
                  onClick={onLogout}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 