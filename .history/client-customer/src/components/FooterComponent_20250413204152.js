import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaTiktok,
} from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="footer-enhanced">
      <div className="footer-container">
        {/* Column 1: Logo + Description */}
        <div className="footer-section">
          <img src="/logo192.png" alt="Logo" width="50" height="50" />
          <p>YourBrand - Quality is our honor ☕</p>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-section">
          <h4>Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            <FaPhone /> 0123 456 789
          </p>
          <p>
            <FaEnvelope /> support@yourbrand.com
          </p>
        </div>

        {/* Column 4: Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 YourBrand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
