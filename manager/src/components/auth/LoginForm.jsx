import React, { useState } from 'react';
import { Mail, Lock, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Link, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Debug: Log Supabase credentials (for development only)
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://apihakcncfjhlqwzfhyy.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaWhha2NuY2ZqaGxxd3pmaHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDQwNTMsImV4cCI6MjA2NzgyMDA1M30.SL86eqMmxhxYpBD_kRCc0084mrEFL5-y08GU2Jrk4zM';
console.log('[DEBUG] SUPABASE_URL:', SUPABASE_URL);
console.log('[DEBUG] SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY.slice(0, 8) + '...');

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, googleLogin } = useAuth();
  const [googleError, setGoogleError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('[DEBUG] Attempting login with:', formData.email);
      await login(formData.email, formData.password);
      console.log('[DEBUG] Login successful');
    } catch (error) {
      console.error('[DEBUG] Login error:', error);
      setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setGoogleError('');
    try {
      await googleLogin();
    } catch (error) {
      setGoogleError(error.message || 'Google login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-secondary-800 mb-2">
            Welcome to Stello
          </h2>
          <p className="text-secondary-500">
            Sign in to manage your inventory
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-md">
              {errors.general}
            </div>
          )}
          {googleError && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-md">
              {googleError}
            </div>
          )}
          {(!SUPABASE_URL || !SUPABASE_ANON_KEY) && (
            <div className="bg-warning-50 border border-warning-200 text-warning-700 px-4 py-3 rounded-md">
              Supabase credentials are missing! Please check your .env file and restart the dev server.
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  className="pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-secondary-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
         <Button
           type="button"
           className="w-full mt-2 bg-white border border-neutral-300 text-secondary-700 hover:bg-neutral-50 flex items-center justify-center"
           onClick={handleGoogleLogin}
           disabled={isLoading}
         >
           <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.3 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-8.5 20-20 0-1.3-.1-2.1-.3-3.5z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.3 2.5 24 2.5c-7.2 0-13 5.8-13 13 0 1.6.3 3.1.8 4.5z" fill="#FF3D00"/><path d="M24 44.5c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4C29.9 35.1 27.1 36 24 36c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.1 41.2 14.9 44.5 24 44.5z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 6.5-11.7 6.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.3 2.5 24 2.5c-11.3 0-20.5 9.2-20.5 20.5S12.7 43.5 24 43.5c10.5 0 20-8.5 20-20 0-1.3-.1-2.1-.3-3.5z" fill="#1976D2"/></g></svg>
           Sign in with Google
         </Button>
        </form>
        
        <div className="text-center text-sm text-secondary-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 