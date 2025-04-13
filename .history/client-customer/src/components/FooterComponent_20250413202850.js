import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Your Company. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterComponent;
