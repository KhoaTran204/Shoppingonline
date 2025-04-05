import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

const Inform = () => {
  const { token, customer, mycart, setToken, setCustomer, setMycart } =
    useContext(MyContext);

  const handleLogout = () => {
    setToken("");
    setCustomer(null);
    setMycart([]);
  };

  return (
    <div className="inform-container">
      <div className="inform-left">
        {token === "" ? (
          <div className="auth-links">
            <Link to="/login">Login</Link> | <Link to="/signup">Sign-up</Link> |{" "}
            <Link to="/active">Active</Link>
          </div>
        ) : (
          <div className="user-info">
            <span>
              Welcome, <b>{customer.name}</b>
            </span>{" "}
            |
            <Link to="/home" onClick={handleLogout}>
              Logout
            </Link>{" "}
            |<Link to="/myprofile">My profile</Link> |
            <Link to="/myorders">My orders</Link>
          </div>
        )}
      </div>
      <div className="inform-right">
        <Link to="/mycart" className="cart-link">
          🛒 My cart
        </Link>
        <span className="cart-count">({mycart.length} items)</span>
      </div>
    </div>
  );
};

export default Inform;
