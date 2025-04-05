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
          <h2 className="product-detail-title">PRODUCT DETAILS</h2>

          <div className="product-detail-content">
            <div className="product-image">
              <img
                src={"data:image/jpg;base64," + prod.image}
                alt={prod.name}
              />
            </div>

            <div className="product-info">
              <form>
                <table className="product-info-table">
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
                          className="quantity-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          type="submit"
                          value="ADD TO CART"
                          onClick={(e) => this.btnAdd2CartClick(e)}
                          className="add-to-cart-button"
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
    return <div />;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // Event handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert("Good job!");
    } else {
      alert("Please input quantity");
    }
  }

  // API calls
  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}

export default withRouter(ProductDetail);
