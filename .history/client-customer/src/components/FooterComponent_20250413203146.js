import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Logo hoặc hình ảnh */}
        <Link to="/">
          <img
            src="/logo192.png" // Thay đổi link ảnh của bạn ở đây
            alt="Logo"
            width="50"
            height="50"
          />
        </Link>

        {/* Các liên kết */}
        <div>
          <p>© 2025 Your Brand. All rights reserved.</p>
          <p>
            <Link
              to="/about"
              style={{ color: "#f8f0f0", textDecoration: "underline" }}
            >
              About
            </Link>{" "}
            |{" "}
            <Link
              to="/privacy"
              style={{ color: "#f8f0f0", textDecoration: "underline" }}
            >
              Privacy
            </Link>{" "}
            |{" "}
            <Link
              to="/contact"
              style={{ color: "#f8f0f0", textDecoration: "underline" }}
            >
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
