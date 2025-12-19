import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
// Global Components
import Header from '../components/Global/Header';
import Sidebar from '../components/Global/Sidebar';
import Footer from '../components/Global/Footer';
import ProtectedRoute from '../components/Global/ProtectedRoute';
import ProtectedLayout from '../components/Global/ProtectedLayout';
// Screens
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Media from '../pages/media';
import Settings from '../pages/Settings';
import AddNewProduct from '../pages/product';
import AllProducts from "../pages/allproducts";
import EditProduct from "../pages/edit-product";
import Login from '../pages/login'; // Make sure you import your Login page
import Order from "../pages/orders";
import OrderDetails from "../pages/orderdetails"; // Import OrderDetails page
import MediaClone from '../pages/media-clone'; // Working on it 
import NotFound from '../pages/NotFound';

function LayoutWrapper() {
  const location = useLocation();
  const invalidPaths = ["/login"]; // paths where sidebar should NOT show
  const showSidebar = !invalidPaths.includes(location.pathname);


  return (
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          {/* PROTECTED */}
          <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="/media-clone" element={<ProtectedRoute><Media /></ProtectedRoute>} />
            <Route path="/add-new-product" element={<ProtectedRoute><AddNewProduct /></ProtectedRoute>} />
            <Route path="/all-products" element={<ProtectedRoute><AllProducts /></ProtectedRoute>} />
            <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
            <Route path="/order-details/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/media" element={<ProtectedRoute><MediaClone /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  );
}

function Routers() {
  return (
    <ThemeProvider>
      <LayoutWrapper />
    </ThemeProvider>
  );
}

export default Routers;