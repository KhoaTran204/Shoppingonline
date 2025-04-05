import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="navbar inform-navbar">
        <div className="inform-left">
          {this.context.token === "" ? (
            <div>
              <Link className="inform-link" to="/login">
                Login
              </Link>{" "}
              |{" "}
              <Link className="inform-link" to="/signup">
                Sign-up
              </Link>{" "}
              |{" "}
              <Link className="inform-link" to="/active">
                Active
              </Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> |{" "}
              <Link
                className="inform-link"
                to="/home"
                onClick={() => this.lnkLogoutClick()}
              >
                Logout
              </Link>{" "}
              |{" "}
              <Link className="inform-link" to="/myprofile">
                My profile
              </Link>{" "}
              |{" "}
              <Link className="inform-link" to="/myorders">
                My orders
              </Link>
            </div>
          )}
        </div>
        <div className="inform-right">
          <Link className="inform-link" to="/mycart">
            🛒
          </Link>{" "}
          have <b className="cart-count">{this.context.mycart.length}</b> items
        </div>
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
