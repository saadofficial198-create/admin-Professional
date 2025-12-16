import React from 'react';
import { Link } from 'react-router-dom'; 
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="header">
      <div>
        <h1>Food Grocery Admin Panel</h1>
        <nav>
          <Link to="/">Dashboard</Link> |{' '}
          <Link to="/users">Users</Link> |{' '}
          <Link to="/media">Media</Link> |{' '}
          <Link to="/add-new-product">Add New Product</Link> |{' '}
          <Link to="/all-products">All Products</Link> |{' '}
          <Link to="/orders">Orders</Link> |{' '}
          <Link to="/settings">Settings</Link>
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
