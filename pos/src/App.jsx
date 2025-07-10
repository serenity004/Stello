import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import POSInterface from './components/POSInterface';
import NotificationToast from './components/NotificationToast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    showNotification('success', 'Login Successful', 'Welcome to Stello POS');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showNotification('success', 'Logged Out', 'You have been successfully logged out');
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} showNotification={showNotification} />
      ) : (
        <POSInterface onLogout={handleLogout} showNotification={showNotification} />
      )}
      {notification && (
        <NotificationToast
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App; 