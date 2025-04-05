import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
// import "./MyOrders.css";  // Import updated CSS file

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }

  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;

    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          className="myorders-table-row"
          onClick={() => this.trItemClick(item)}
        >
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}.000đ</td>
          <td>{item.status}</td>
        </tr>
      );
    });

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="myorders-table-row">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td>
              <img src={"data:image/jpg;base64," + item.product.image} alt="" />
            </td>
            <td>{item.product.price}.000đ</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }

    return (
      <div>
        <div className="myorders-container">
          <h2 className="myorders-heading">ORDER LIST</h2>
          <table className="myorders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust.name</th>
                <th>Cust.phone</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
        </div>

        {this.state.order ? (
          <div className="myorders-container">
            <h2 className="myorders-heading">ORDER DETAIL</h2>
            <table className="myorders-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/customer/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;
