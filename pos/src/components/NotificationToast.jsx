import React from 'react';

const NotificationToast = ({ type, title, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle text-success-500 text-xl';
      case 'error':
        return 'fas fa-times-circle text-danger-500 text-xl';
      case 'info':
        return 'fas fa-info-circle text-primary-500 text-xl';
      case 'warning':
        return 'fas fa-exclamation-triangle text-warning-500 text-xl';
      default:
        return 'fas fa-info-circle text-primary-500 text-xl';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="max-w-xs w-full bg-white rounded-xl shadow-lg overflow-hidden notification border border-neutral-200">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className={getIcon()}></i>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-secondary-900">{title}</p>
              <p className="mt-1 text-sm text-secondary-500">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="bg-white rounded-lg inline-flex text-secondary-400 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <span className="sr-only">Close</span>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast; 