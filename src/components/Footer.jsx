import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Fresh • Natural • Pure</h3>
        <p>
          Three generations of dairy excellence, bringing you the freshest, highest quality dairy products from our family farm.
        </p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/products">Our Products</a></li>
          <li><a href="/tours">Farm Tours</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Products</h4>
        <ul>
          <li>Fresh Milk</li>
          <li>Artisan Butter</li>
          <li>Farmhouse Cheese</li>
          <li>Greek Yogurt</li>
          <li>Ice Cream</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact Info</h4>
        <p>1234 Country Road, Green Valley, CA</p>
        <p>(555) 123-FARM</p>
        <p><a href="mailto:hello@mildarfarm.com">hello@mildarfarm.com</a></p>
      </div>
    </footer>
  );
}

export default Footer;