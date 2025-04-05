import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import "./Inform.css"; // Import file CSS riêng

class Inform extends Component {
  static contextType = MyContext; // Truy cập context

  render() {
    return (
      <div className="inform-container">
        <div className="inform-left">
          {this.context.token === "" ? (
            <div>
              <Link to="/login">Login</Link> | <Link to="/signup">Sign-up</Link>{" "}
              | <Link to="/active">Active</Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> |{" "}
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                Logout
              </Link>{" "}
              | <Link to="/myprofile">My profile</Link> |{" "}
              <Link to="/myorders">My orders</Link>
            </div>
          )}
        </div>
        <div className="inform-right">
          <Link to="/mycart" className="cart-link">
            🛒 My cart
          </Link>
          <span className="cart-count">
            ({this.context.mycart.length} items)
          </span>
        </div>
      </div>
    );
  }

  // Xử lý logout
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
