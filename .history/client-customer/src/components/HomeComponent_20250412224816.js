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
    const productCard = (item) => (
      <div
        key={item._id}
        className="min-w-[200px] max-w-[200px] bg-white rounded-xl shadow-md overflow-hidden m-2"
      >
        <Link to={"/product/" + item._id}>
          <img
            src={"data:image/jpg;base64," + item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
        </Link>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {item.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-red-600 font-bold">{item.price}.000đ</span>
            <div className="text-yellow-400 text-sm">
              {[...Array(5)].map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

    const newprods = this.state.newprods.map(productCard);
    const hotprods = this.state.hotprods.map(productCard);

    return (
      <div className="px-4 py-6 space-y-8">
        {/* NEW PRODUCTS */}
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            NEW PRODUCTS
          </h2>
          <div className="flex overflow-x-auto no-scrollbar py-2">
            {newprods}
          </div>
        </div>

        {/* HOT PRODUCTS */}
        {this.state.hotprods.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              HOT PRODUCTS
            </h2>
            <div className="flex overflow-x-auto no-scrollbar py-2">
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
