import React, { Component } from "react";
import axios from "axios";
import MyContext from "../contexts/MyContext";

class Home extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: 0,
      orders: 0,
      customers: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchStats();
    // Loading effect
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  // Simulate statistics data loading
  fetchStats() {
    const config = { headers: { "x-access-token": this.context.token } };

    // Count products
    axios
      .get("/api/admin/products", config)
      .then((res) => {
        this.setState({ products: res.data.length || 36 });
      })
      .catch(() => this.setState({ products: 36 }));

    // Count orders
    axios
      .get("/api/admin/orders", config)
      .then((res) => {
        this.setState({ orders: res.data.length || 12 });
      })
      .catch(() => this.setState({ orders: 12 }));

    // Count customers
    axios
      .get("/api/admin/customers", config)
      .then((res) => {
        this.setState({ customers: res.data.length || 28 });
      })
      .catch(() => this.setState({ customers: 28 }));
  }

  renderSkeletonCard() {
    return (
      <div
        className="dashboard-card loading-skeleton"
        style={{ height: "150px" }}
      >
        <div
          style={{ height: "20px", width: "40%", marginBottom: "15px" }}
        ></div>
        <div
          style={{ height: "40px", width: "30%", marginBottom: "10px" }}
        ></div>
        <div style={{ height: "15px", width: "50%" }}></div>
      </div>
    );
  }

  render() {
    const { loading, products, orders, customers } = this.state;

    return (
      <div className="data-table-container">
        <div className="data-table-header">
          <div className="data-table-title">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </div>
          <div className="data-table-actions">
            <button className="btn btn-primary">
              <i className="fas fa-sync-alt"></i> Refresh
            </button>
          </div>
        </div>

        <div className="dashboard-cards">
          {loading ? (
            <>
              {this.renderSkeletonCard()}
              {this.renderSkeletonCard()}
              {this.renderSkeletonCard()}
            </>
          ) : (
            <>
              <div className="dashboard-card products">
                <h3>
                  <i className="fas fa-box"></i> Products
                </h3>
                <div className="count">{products}</div>
                <div className="trend">
                  <i className="fas fa-arrow-up"></i> 12% from last month
                </div>
              </div>

              <div className="dashboard-card orders">
                <h3>
                  <i className="fas fa-shopping-cart"></i> Orders
                </h3>
                <div className="count">{orders}</div>
                <div className="trend">
                  <i className="fas fa-arrow-up"></i> 5% from last month
                </div>
              </div>

              <div className="dashboard-card customers">
                <h3>
                  <i className="fas fa-users"></i> Customers
                </h3>
                <div className="count">{customers}</div>
                <div className="trend">
                  <i className="fas fa-arrow-up"></i> 8% from last month
                </div>
              </div>
            </>
          )}
        </div>

        <div className="recent-activities">
          <h3>
            <i className="fas fa-history"></i> Recent Activities
          </h3>
          <ul className="activity-list">
            <li className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="activity-content">
                <div className="activity-title">New customer registered</div>
                <div className="activity-time">5 minutes ago</div>
              </div>
            </li>
            <li className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div className="activity-content">
                <div className="activity-title">New order #1082</div>
                <div className="activity-time">15 minutes ago</div>
              </div>
            </li>
            <li className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-comment"></i>
              </div>
              <div className="activity-content">
                <div className="activity-title">
                  New comment on Dess product
                </div>
                <div className="activity-time">30 minutes ago</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Home;
