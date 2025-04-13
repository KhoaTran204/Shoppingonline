import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
// import "./Product.css"; // Import your CSS file

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
        <figure className="product-card">
          <Link to={"/product/" + item._id}>
            <img
              src={"data:image/jpg;base64," + item.image}
              width="300px"
              height="300px"
              alt=""
              className="product-image"
            />
          </Link>
          <figcaption className="product-caption">
            <span
              className="product-name"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {item.name}
            </span>

            <br />
            <span className="product-price" style={{ fontWeight: "bold" }}>
              Price: {item.price}.000đ
            </span>
          </figcaption>
        </figure>
      </div>
    ));

    return (
      <div className="text-center">
        <h2 className="section-title">LIST PRODUCTS</h2>
        <div className="product-grid">{prods}</div>
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
        const result = res.data;
        this.setState({ products: result });
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  }

  apiGetProductsByKeyword(keyword) {
    axios
      .get(`/api/customer/products/search/${keyword}`)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result });
      })
      .catch((error) => {
        console.error("Error fetching products by keyword:", error);
      });
  }
}

export default withRouter(Product);
