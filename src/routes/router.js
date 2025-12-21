import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";

// Guards & Layout
import ProtectedRoute from "../components/Global/ProtectedRoute";
import ProtectedLayout from "../components/Global/ProtectedLayout";

// Pages
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Media from "../pages/media";
import Settings from "../pages/Settings";
import AddNewProduct from "../pages/product";
import AllProducts from "../pages/allproducts";
import EditProduct from "../pages/edit-product";
import Login from "../pages/login";
import Order from "../pages/orders";
import OrderDetails from "../pages/orderdetails";
import NotFound from "../pages/NotFound";

function Routers() {
  return (
    <ThemeProvider>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED (Sidebar ALWAYS visible here) */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/media" element={<Media />} />
          <Route path="/add-new-product" element={<AddNewProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/settings" element={<Settings />} />

          {/* ✅ PRIVATE 404 (WITH SIDEBAR) */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ✅ PUBLIC 404 (NO SIDEBAR) */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </ThemeProvider>
  );
}

export default Routers;