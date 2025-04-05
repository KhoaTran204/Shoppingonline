import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={"/product/" + item._id} className="product-link">
            <img
              src={"data:image/jpg;base64," + item.image}
              alt={item.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p className="product-price">${item.price}</p>
            </div>
          </Link>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={"/product/" + item._id} className="product-link">
            <img
              src={"data:image/jpg;base64," + item.image}
              alt={item.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p className="product-price">${item.price}</p>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="product-container">
        <div className="section">
          <h2 className="section-title">New Products</h2>
          <div className="product-grid">{newprods}</div>
        </div>

        {this.state.hotprods.length > 0 && (
          <div className="section">
            <h2 className="section-title">Hot Products</h2>
            <div className="product-grid">{hotprods}</div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get("/api/customer/products/new").then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get("/api/customer/products/hot").then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;
