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
    const newprods = this.state.newprods
      .filter((item) => item && item._id) // tránh null
      .map((item) => {
        return (
          <div key={item._id} className="inline">
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
        );
      });

    const hotprods = this.state.hotprods
      .filter((item) => item && item._id) // tránh null
      .map((item) => {
        return (
          <div key={item._id} className="inline">
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
        );
      });

    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">NEW PRODUCTS</h2>
          <div className="product-scroll-container">{newprods}</div>
        </div>

        {hotprods.length > 0 ? (
          <div className="align-center">
            <h2 className="text-center">HOT PRODUCTS</h2>
            <div className="product-scroll-container">{hotprods}</div>
          </div>
        ) : (
          <div />
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
      console.log("Hot Products:", res.data);
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;
