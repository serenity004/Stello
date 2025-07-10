import React, { useState } from 'react';
import { Bell, Zap } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import AIAssistant from '../ai/AIAssistant';

const Header = () => {
  const { isCollapsed } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/inventory':
        return 'Inventory';
      case '/sales':
        return 'Sales';
      case '/team':
        return 'Team';
      case '/settings':
        return 'Settings';
      case '/notifications':
        return 'Notifications';
      case '/ai':
        return 'AI Features';
      default:
        return 'Dashboard';
    }
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200 shadow-sm relative">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <h1 className={cn(
            "text-xl font-bold text-secondary-800 transition-all duration-300",
            isCollapsed && "lg:text-lg"
          )}>
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* AI Assistant */}
          <button 
            onClick={() => setIsAssistantOpen(true)}
            className="p-2 rounded-full text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            title="AI Assistant"
          >
            <Zap size={20} />
          </button>
          
          {/* Notifications */}
          <button 
            onClick={handleNotificationsClick}
            className="p-2 rounded-full text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500 shadow-sm"></span>
          </button>
        </div>
      </div>
      
      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </header>
  );
};

export default Header; 