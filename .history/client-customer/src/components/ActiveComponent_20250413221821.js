import axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtToken: "",
    };
  }

  render() {
    return (
      <div className="active-container">
        <form className="active-box" onSubmit={(e) => this.btnActiveClick(e)}>
          <h2 className="active-title">ACTIVE ACCOUNT</h2>
          <table className="active-form">
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter your activation ID"
                    value={this.state.txtID}
                    onChange={(e) => this.setState({ txtID: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td>Token</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter your activation token"
                    value={this.state.txtToken}
                    onChange={(e) =>
                      this.setState({ txtToken: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ACTIVE" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      toast.error("Please input ID and token");
    }
  }

  apiActive(id, token) {
    const body = { id, token };
    axios
      .post("/api/customer/active", body)
      .then((res) => {
        const result = res.data;
        if (result) {
          toast.success("Activation successful! 🎉");
        } else {
          toast.error("Error! Please try again later.");
        }
      })
      .catch((err) => {
        toast.error("Server error! Please try again later.");
      });
  }
}

export default Active;
