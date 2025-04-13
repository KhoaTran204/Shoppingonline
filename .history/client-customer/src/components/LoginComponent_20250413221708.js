import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "khoatran004",
      txtPassword: "111111",
    };
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">CUSTOMER LOGIN</h2>
          <form>
            <table className="align-center form-table">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={this.state.txtUsername}
                      onChange={(e) =>
                        this.setState({ txtUsername: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={this.state.txtPassword}
                      onChange={(e) =>
                        this.setState({ txtPassword: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="submit"
                      value="LOGIN"
                      onClick={(e) => this.btnLoginClick(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </div>
    );
  }

  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      toast.error("Please input username and password");
    }
  }

  apiLogin(account) {
    axios
      .post("/api/customer/login", account)
      .then((res) => {
        const result = res.data;
        if (result.success === true) {
          this.context.setToken(result.token);
          this.context.setCustomer(result.customer);
          this.props.navigate("/home");
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        toast.error("An error occurred while logging in");
      });
  }
}

export default withRouter(Login);
