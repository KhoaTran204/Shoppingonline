import axios from "axios";
import React, { Component } from "react";
import "./Active.css"; // Import file CSS riêng

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
        <form className="active-form" onSubmit={(e) => this.btnActiveClick(e)}>
          <h2 className="form-title">Active Account</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td className="form-label">ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => this.setState({ txtID: e.target.value })}
                    className="form-input"
                  />
                </td>
              </tr>
              <tr>
                <td className="form-label">Token</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtToken}
                    onChange={(e) =>
                      this.setState({ txtToken: e.target.value })
                    }
                    className="form-input"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="Activate"
                    className="form-submit"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      alert("Please input ID and Token");
    }
  }

  apiActive(id, token) {
    const body = { id, token };
    axios.post("/api/customer/active", body).then((res) => {
      const result = res.data;
      if (result) {
        alert("Good job!");
      } else {
        alert("Error! An error occurred. Please try again later.");
      }
    });
  }
}

export default Active;
