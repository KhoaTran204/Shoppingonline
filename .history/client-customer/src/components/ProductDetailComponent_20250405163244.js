import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="product-detail-container">
          <h2 className="product-detail-title">Product Details</h2>
          <div className="product-info">
            <div className="product-image">
              <img
                src={"data:image/jpg;base64," + prod.image}
                alt={prod.name}
              />
            </div>
            <div className="product-description">
              <form>
                <table className="product-table">
                  <tbody>
                    <tr>
                      <td className="label">ID:</td>
                      <td>{prod._id}</td>
                    </tr>
                    <tr>
                      <td className="label">Name:</td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td className="label">Price:</td>
                      <td>{prod.price}</td>
                    </tr>
                    <tr>
                      <td className="label">Category:</td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td className="label">Quantity:</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={this.state.txtQuantity}
                          onChange={(e) => {
                            this.setState({ txtQuantity: e.target.value });
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          type="submit"
                          value="Add to Cart"
                          className="add-to-cart-btn"
                          onClick={(e) => this.btnAdd2CartClick(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return <div className="loading">Loading...</div>;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) {
        // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert("Added to cart successfully!");
    } else {
      alert("Please input a valid quantity");
    }
  }

  // apis
  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}

export default withRouter(ProductDetail);
