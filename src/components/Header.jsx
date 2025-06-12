// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaPhone } from "react-icons/fa";
import "./Header.css";
import { useCart } from '../contexts/CartContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen);     // Toggle the menu
    setPop(true);               // Trigger pop animation
    setTimeout(() => setPop(false), 300); // Remove pop class after 300ms
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setMenuOpen(false); // close menu
    navigate("/login"); // redirect to login
  };

  return (
    <header className="header">
      <Link to="/" className="logo-group" style={{ textDecoration: "none", color: "inherit" }}>
        <img src="/Logo.png" alt="Logo" className="logo-img" />
        <div>
          <span className="brand-title">Yogeshwar Dairy</span>
          <div className="logo-subtitle">Natural | Pure | Fresh</div>
        </div>
      </Link>

      {/* Hamburger for mobile */}
      <div
        className={`hamburger ${pop ? 'pop-effect' : ''}`}
        onClick={handleHamburgerClick}
        aria-label="Open navigation"
      >
        <span />
        <span />
        <span />
      </div>

      {/* Desktop nav */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({getCartCount()})
        </Link>
      </nav>

      <div className="actions">
        <div className="contact-info">
          <span className="contact-label">Contact Us</span>
          <span className="contact-number">123-456-7890</span>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <nav className="mobile-menu">
          <div className="mobile-menu-left">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </div>
          <div className="mobile-menu-right">
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <FaPhone /> Contact
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              🛒 Cart ({getCartCount()})
            </Link>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
