import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";
import "../App.css";

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
        <div className="product-detail-container align-center">
          <h2 className="product-detail-title text-center">PRODUCT DETAILS</h2>
          <figure className="product-image-container caption-right">
            <img
              className="product-image"
              src={"data:image/jpg;base64," + prod.image}
              width="300px"
              height="300px"
              alt=""
            />
            <figcaption className="product-info-container">
              <form className="product-info-form">
                <table className="product-info-table">
                  <tbody>
                    <tr>
                      <td className="IDlabel" align="left">
                        ID:
                      </td>
                      <td className="product-id">{prod._id}</td>
                    </tr>
                    <tr>
                      <td className="Namelabel" align="left">
                        Name:
                      </td>
                      <td className="product-name">{prod.name}</td>
                    </tr>
                    <tr>
                      <td className="Pricelabel" align="left">
                        Price:
                      </td>
                      <td className="productdt-price">{prod.price}đ</td>
                    </tr>
                    <tr>
                      <td className="Categorylabel" align="left">
                        Category:
                      </td>
                      <td className="product-category">{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td className="Quantitylabel" align="left">
                        Quantity:
                      </td>
                      <td>
                        <input
                          className="quantity-input"
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
                          className="add-to-cart-btn"
                          type="submit"
                          value="ADD TO CART"
                          onClick={(e) => this.btnAdd2CartClick(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return <div />;
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
      alert("Good job!");
    } else {
      alert("Please input quantity");
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
