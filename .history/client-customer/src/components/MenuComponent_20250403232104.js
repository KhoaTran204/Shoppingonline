import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Sử dụng icon tìm kiếm từ Font Awesome

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
          <input
            type="search"
            placeholder="Search..."
            value={this.state.txtKeyword}
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
          />
          <button onClick={(e) => this.btnSearchClick(e)}>
            {/* Sử dụng icon Font Awesome */}
            <FontAwesomeIcon icon={faSearch} />
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

export default Menu;
