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
        {/* Tiêu đề và ảnh bìa */}
        <div className="align-center">
          <h1 className="text-center">RUBIES</h1>
          <img
            src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/483525933_1214184293403375_1580403919101574731_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeE1M3xntOIR9phYE3tVWhB63YV1IEbOJ9LdhXUgRs4n0qwIQvARvamqMpMTvwMw0-DECsLk7PKpeVmz-9Tx2rnf&_nc_ohc=h1PFs2m3Bw0Q7kNvwHYuQlV&_nc_oc=AdmGgVB0EOVcCyIXeFwDCaUM5jqSpy109JYIw23h_P7Nni3EvvfitWLllzi0xOAA6qw&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=t500k1zf7KJRzpdJPEHqJg&oh=00_AfGopFQodSuGIHou-Ws2pqDqgjPVF9QQFDAx07qmhqzFIQ&oe=67F7DC51"
            alt="Banner"
            style={{
              width: "100%",
              maxHeight: "1000px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
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
