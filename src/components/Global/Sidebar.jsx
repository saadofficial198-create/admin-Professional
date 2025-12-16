import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/sidebar.css";
import { Search, Home, User, Arrow, Setting } from "../../assets/icons/index";
// Images
import Logo from "../../assets/images/logo.png";
import Account from "../../assets/images/user.jpg";

const Sidebar = () => {
  const location = useLocation();

  // check active exact
  const isActive = (path) => location.pathname === path;

  // check parent active (submenu open karne ke liye)
  const isParentActive = (paths) =>
    paths.some((p) => location.pathname.startsWith(p));

  return (
    <aside className="sidebar">
      <img className="logo" src={Logo} alt="Logo" />
      <div className="search">
        <Search className="icon" />
        <input type="text" placeholder="Search for..." />
      </div>

      <ul>
        {/* Dashboard */}
        <li className={isActive("/") ? "active" : ""}>
          <Link to="/">
            <Home className="icon" />
            Dashboard
          </Link>
        </li>

        {/* Users */}
        <li className={isActive("/users") ? "active" : ""}>
          <Link to="/users">
            <User className="icon" />
            Users
          </Link>
        </li>

        {/* Media */}
        <li
          className={`${isParentActive(["/media", "/add-new-media"]) ? "active open" : ""
            }`}
        >
          <Link to="/media">
            <User className="icon" />
            Medias
          </Link>
        </li>

        {/* Products */}
        <li
          className={`${isParentActive(["/all-products", "/add-new-product"])
            ? "active open"
            : ""
            }`}
        >
          <Link to="/all-products">
            <User className="icon" />
            Products
            <Arrow className="p-arrow" />
          </Link>
          <ul
            className={`submenu ${isParentActive(["/all-products", "/add-new-product"])
              ? "show"
              : ""
              }`}
          >
            <li className={isActive("/all-products") ? "active" : ""}>
              <Link to="/all-products">All Products</Link>
            </li>
            <li className={isActive("/add-new-product") ? "active" : ""}>
              <Link to="/add-new-product">Add New Products</Link>
            </li>
          </ul>
        </li>

        {/* Orders */}
        <li className={isActive("/orders") ? "active" : ""}>
          <Link to="/orders">
            <User className="icon" />
            Orders
          </Link>
        </li>
      </ul>
      <ul className="settings">
        {/* Settings */}
        <li className={isActive("/settings") ? "active" : ""}>
          <Link to="/settings">
            <Setting className="icon" />
            Settings
          </Link>
        </li>
        {/* Account */}
        <li className={isActive("/account") ? "active" : ""}>
          <Link to="/account">
            <img className="account" src={Account} alt="Account" />
            <div className="account-setting">
              <h5>Saad Farooq</h5>
              <p className="small">Account Settings</p>
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
