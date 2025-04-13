import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CartUtil from "../utils/CartUtil";
import withRouter from "../utils/withRouter";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      showModal: false, // To track modal visibility
    };
  }

  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="mycart-table-row">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td>
            <img src={"data:image/jpg;base64," + item.product.image} alt="" />
          </td>
          <td>{item.product.price}.000đ</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td>
            <span
              className="mycart-action"
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Remove
            </span>
          </td>
        </tr>
      );
    });

    return (
      <div className="mycart-container">
        <h2 className="mycart-heading">ITEM LIST</h2>
        <table className="mycart-table">
          <thead>
            <tr className="mycart-table-header">
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mycart}
            <tr>
              <td colSpan="6"></td>
              <td className="mycart-total">Total</td>
              <td>{CartUtil.getTotal(this.context.mycart)}</td>
              <td>
                <span
                  className="mycart-action"
                  onClick={() => this.showCheckoutModal()}
                >
                  CHECKOUT
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ToastContainer to display toasts */}
        <ToastContainer />

        {/* Modal for Checkout Confirmation */}
        {this.state.showModal && (
          <div className="checkout-modal">
            <div className="checkout-modal-content">
              <h3>Are you sure you want to proceed to checkout?</h3>
              <div className="checkout-modal-buttons">
                <button onClick={this.handleConfirmCheckout}>Yes</button>
                <button onClick={this.closeModal}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show the confirmation modal
  showCheckoutModal = () => {
    this.setState({ showModal: true });
  };

  // Close the modal
  closeModal = () => {
    this.setState({ showModal: false });
  };

  // Handle confirmation of checkout
  handleConfirmCheckout = () => {
    this.setState({ showModal: false }); // Close the modal
    if (this.context.mycart.length > 0) {
      const total = CartUtil.getTotal(this.context.mycart);
      const items = this.context.mycart;
      const customer = this.context.customer;
      if (customer) {
        this.apiCheckout(total, items, customer);
      } else {
        this.props.navigate("/login");
        toast.info("Please log in to proceed with checkout.");
      }
    } else {
      toast.error(
        "Your cart is empty. Please add items to your cart before checking out."
      );
    }
  };

  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
      toast.info("Item removed from your cart."); // Toast message for item removal
    }
  }

  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .post("/api/customer/checkout", body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          toast.success(
            "Thank you for your purchase! Your order has been successfully placed."
          ); // Success toast
          this.context.setMycart([]);
          this.props.navigate("/home");
        } else {
          toast.error(
            "Oops! Something went wrong during the checkout. Please try again later."
          ); // Error toast for failed checkout
        }
      })
      .catch((error) => {
        toast.error(
          "There was an issue connecting to the server. Please try again later."
        );
      });
  }
}

export default withRouter(Mycart);
