import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Animals from './pages/Animals';
import Products from './pages/Products';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/products" element={<Products />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;