import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  const currencies = useMemo(() => [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' }
  ], []);

  useEffect(() => {
    // Load saved currency from localStorage
    const savedCurrency = localStorage.getItem('stello_currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
      const selectedCurrency = currencies.find(c => c.code === savedCurrency);
      if (selectedCurrency) {
        setCurrencySymbol(selectedCurrency.symbol);
      }
    }
  }, [currencies]);

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    const selectedCurrency = currencies.find(c => c.code === newCurrency);
    if (selectedCurrency) {
      setCurrencySymbol(selectedCurrency.symbol);
    }
    localStorage.setItem('stello_currency', newCurrency);
  };

  const formatCurrency = (amount) => {
    return `${currencySymbol}${amount.toFixed(2)}`;
  };

  const value = {
    currency,
    currencySymbol,
    currencies,
    updateCurrency,
    formatCurrency
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}; 