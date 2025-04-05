import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withRouter from "../utils/withRouter";
import { FaSearch } from "react-icons/fa";
import "../styles/App.css"; // Đảm bảo bạn có file CSS phù hợp

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  btnSearchClick = (e) => {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  };

  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      this.setState({ categories: res.data });
    });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">Shop</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {this.state.categories.map((item) => (
            <li key={item._id}>
              <Link to={"/product/category/" + item._id}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            value={this.state.txtKeyword}
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
          />
          <button onClick={this.btnSearchClick}>
            <FaSearch />
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu);
