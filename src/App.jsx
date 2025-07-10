import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Team from './pages/Team';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
};

export default App; 