import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
// Global Components
import Header from '../components/Global/Header';
import Sidebar from '../components/Global/Sidebar';
import Footer from '../components/Global/Footer';
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

function LayoutWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="admin-container">
      {!isLoginPage && <Sidebar />}
      <div className="main-content">
        {/* {!isLoginPage && <Header />} */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/media-clone" element={<Media />} />
            <Route path="/add-new-product" element={<AddNewProduct />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/media" element={<MediaClone />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
        {/* {!isLoginPage && <Footer />} */}
      </div>
    </div>
  );
}

function Routers() {
  return (
    <ThemeProvider>
      <Router>
        <LayoutWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default Routers;
