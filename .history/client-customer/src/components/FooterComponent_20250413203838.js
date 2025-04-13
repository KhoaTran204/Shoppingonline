import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="footer-enhanced">
      <div className="footer-container">
        {/* Cột 1: Logo + mô tả */}
        <div className="footer-section">
          <img src="/logo192.png" alt="Logo" width="50" height="50" />
          <p>YourBrand - Chất lượng là danh dự ☕</p>
        </div>

        {/* Cột 2: Điều hướng */}
        <div className="footer-section">
          <h4>Liên kết</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/privacy">Chính sách</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>
            <FaPhone /> 0123 456 789
          </p>
          <p>
            <FaEnvelope /> support@yourbrand.com
          </p>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div className="footer-section">
          <h4>Kết nối</h4>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
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
