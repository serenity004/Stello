import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Sales', href: '/sales', icon: ShoppingCart },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'AI Features', href: '/ai', icon: Zap },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-40 bg-gradient-to-r from-neutral-50 to-neutral-100 border-r border-neutral-200 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        'lg:translate-x-0',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-primary-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
                <Package className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold text-secondary-800">Stello</span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500 shadow-sm'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50 border-l-4 border-transparent'
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Button */}
          <div className="px-2 py-2 border-t border-neutral-100">
            <button
              className={cn(
                'flex items-center w-full px-3 py-2 rounded-lg font-medium transition-all duration-200',
                'text-secondary-500 hover:text-secondary-700 hover:bg-neutral-100 border-l-4 border-transparent'
              )}
              onClick={toggleSidebar}
            >
              <div className="flex flex-col space-y-0.5">
                <div className="w-4 h-0.5 bg-current rounded"></div>
                <div className="w-4 h-0.5 bg-current rounded"></div>
                <div className="w-4 h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>

          {/* Settings Link */}
          <div className="px-2 py-2 border-t border-neutral-100">
            <Link
              to="/settings"
              className={cn(
                'flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200',
                isActive('/settings')
                  ? 'text-accent-600 bg-accent-50 border-l-4 border-accent-500 shadow-sm'
                  : 'text-secondary-500 hover:text-accent-600 hover:bg-accent-50 border-l-4 border-transparent'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && (
                <span className="ml-3">Settings</span>
              )}
            </Link>
          </div>

          {/* User Profile */}
          <div className="px-4 py-4 border-t border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 flex items-center justify-center shadow-sm">
                <span className="text-sm font-medium text-white">
                  {user?.avatar || 'U'}
                </span>
              </div>
              {!isCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-secondary-800">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-secondary-500 capitalize">
                    {user?.role || 'User'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 