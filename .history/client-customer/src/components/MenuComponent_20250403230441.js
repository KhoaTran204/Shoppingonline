import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        <Link to={`/product/category/${item._id}`}>{item.name}</Link>
      </li>
    ));

    return (
      <nav className="navbar">
        {/* Left Menu */}
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {cates}
        </ul>

        {/* Search Bar */}
        <div className="search-bar">
          <TextField
            label="Search..."
            variant="outlined"
            value={this.state.txtKeyword}
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            size="small"
            style={{ marginRight: "10px" }}
          />
          <IconButton
            color="primary"
            onClick={(e) => this.btnSearchClick(e)}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
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
