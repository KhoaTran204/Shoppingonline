import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
// import "./Product.css"; // Uncomment if CSS is separated

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  render() {
    const prods = this.state.products.map((item) => (
      <div key={item._id} className="inline">
        <figure>
          <div>
            <Link to={"/product/" + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                className="fixed-product-image"
                alt={item.name}
              />
            </Link>
          </div>
          <figcaption className="align-left">
            <span className="product-name">{item.name}</span>
            <br />
            <div className="price-stars-container">
              <span className="product-price">{item.price}.000đ</span>
              {[...Array(5)].map((_, index) => (
                <span key={index} className="star">
                  ★
                </span>
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    ));

    return (
      <div className="align-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        <div className="product-scroll-container">{prods}</div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.params.cid !== prevProps.params.cid ||
      this.props.params.keyword !== prevProps.params.keyword
    ) {
      this.fetchProducts();
    }
  }

  fetchProducts() {
    const { params } = this.props;

    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios
      .get(`/api/customer/products/category/${cid}`)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  }

  apiGetProductsByKeyword(keyword) {
    axios
      .get(`/api/customer/products/search/${keyword}`)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.error("Error fetching products by keyword:", error);
      });
  }
}

export default withRouter(Product);
