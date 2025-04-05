"use client";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import { CiSearch } from "react-icons/ci";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }

  render() {
    // Kiểm tra nếu categories là một mảng hợp lệ
    const cates = Array.isArray(this.state.categories)
      ? this.state.categories.map((item) => (
          <li key={item._id}>
            <Link to={`/product/category/${item._id}`}>{item.name}</Link>
          </li>
        ))
      : null;

    return (
      <nav className="navbar">
        {/* Menu bên trái */}
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {cates}
        </ul>

        {/* Thanh tìm kiếm */}
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search..."
            value={this.state.txtKeyword}
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
          />
          <button onClick={(e) => this.btnSearchClick(e)}>
            <CiSearch />
          </button>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    // Gọi API để lấy danh mục
    this.apiGetCategories();
  }

  // event-handler cho nút tìm kiếm
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }

  // Gọi API lấy danh mục
  apiGetCategories() {
    axios
      .get("/api/customer/categories")
      .then((res) => {
        const result = res.data;
        // Kiểm tra xem kết quả có phải là mảng không
        if (Array.isArray(result)) {
          this.setState({ categories: result });
        } else {
          console.error("API response is not an array", result);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }
}

export default withRouter(Menu);
