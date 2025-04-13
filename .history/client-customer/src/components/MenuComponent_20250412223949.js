"use client";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import { FaSearch } from "react-icons/fa";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id}>
        <Link
          to={`/product/category/${item._id}`}
          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200"
        >
          {item.name}
        </Link>
      </li>
    ));

    return (
      <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between flex-wrap gap-4">
        {/* Left Menu */}
        <ul className="flex flex-wrap items-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200 font-semibold"
            >
              Home
            </Link>
          </li>
          {cates}
        </ul>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="search"
            placeholder="Search..."
            value={this.state.txtKeyword}
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            className="px-3 py-2 outline-none w-[200px] text-sm text-gray-700"
          />
          <button
            onClick={(e) => this.btnSearchClick(e)}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          >
            <FaSearch size={18} />
          </button>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }

  // API call
  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);
