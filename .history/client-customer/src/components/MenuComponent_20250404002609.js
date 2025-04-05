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
      categories: [], // Danh sách các danh mục
      txtKeyword: "", // Từ khóa tìm kiếm
    };
  }

  render() {
    // Kiểm tra giá trị categories trong mỗi lần render để debug
    console.log("Danh mục hiện tại: ", this.state.categories);

    // Kiểm tra nếu categories là một mảng hợp lệ và có ít nhất một phần tử
    const cates =
      Array.isArray(this.state.categories) &&
      this.state.categories.length > 0 ? (
        this.state.categories.map((item) => (
          <li key={item._id}>
            <Link to={`/product/category/${item._id}`}>{item.name}</Link>
          </li>
        ))
      ) : (
        <li>Không có danh mục nào</li>
      );

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

  // Event handler cho nút tìm kiếm
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }

  // API call để lấy danh mục
  apiGetCategories() {
    axios
      .get("/api/customer/categories")
      .then((res) => {
        const result = res.data;
        console.log("Dữ liệu nhận được từ API: ", result); // Log để kiểm tra dữ liệu API

        // Kiểm tra xem API trả về mảng hợp lệ hay không
        if (Array.isArray(result) && result.length > 0) {
          this.setState({ categories: result });
        } else {
          console.error("Dữ liệu API không phải là mảng hợp lệ hoặc mảng rỗng");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu categories: ", error);
      });
  }
}

export default withRouter(Menu);
