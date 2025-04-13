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
        <div key={item._id} className="inline-block mr-4 align-top">
          <figure>
            <div>
              <Link to={"/product/" + item._id}>
                <img
                  src={"data:image/jpg;base64," + item.image}
                  className="fixed-product-image"
                  alt=""
                />
              </Link>
            </div>
            <figcaption className="text-left">
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
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline -block mr-4 align-top">
          <figure>
            <div>
              <Link to={"/product/" + item._id}>
                <img
                  src={"data:image/jpg;base64," + item.image}
                  className="fixed-product-image"
                  alt=""
                />
              </Link>
            </div>
            <figcaption className="text-left">
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
      );
    });

    return (
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">NEW PRODUCTS</h2>
          <div className="overflow-x-auto whitespace-nowrap px-4">
            {newprods}
          </div>
        </div>

        {this.state.hotprods.length > 0 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">HOT PRODUCTS</h2>
            <div className="overflow-x-auto whitespace-nowrap px-4">
              {hotprods}
            </div>
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
      console.log("New Products:", res.data);
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get("/api/customer/products/hot").then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;
