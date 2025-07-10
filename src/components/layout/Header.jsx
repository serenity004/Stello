import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-secondary-800">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500 shadow-sm"></span>
          </button>
          
          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center shadow-sm">
                <span className="text-sm font-medium text-white">
                  {user?.avatar || 'U'}
                </span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-secondary-800">
                {user?.name || 'User'}
              </span>
              <ChevronDown className={cn(
                'w-4 h-4 text-secondary-500 transition-transform',
                isDropdownOpen && 'rotate-180'
              )} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-neutral-200">
                <div className="px-4 py-2 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100">
                  <p className="text-sm font-medium text-secondary-800">{user?.name}</p>
                  <p className="text-xs text-secondary-500">{user?.email}</p>
                </div>
                <a
                  href="#profile"
                  className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-100 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </a>
                <a
                  href="#settings"
                  className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-100 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </a>
                <div className="border-t border-neutral-200"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-100 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 