import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
      loading: true
    };
  }
  
  componentDidMount() {
    this.apiGetCustomers();
    // Loading effect
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  }
  
  render() {
    const { customers, orders, order, loading } = this.state;
    
    const customerRows = customers.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trCustomerClick(item)}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>
            <span className={`status-badge ${item.active === 1 ? 'active' : 'inactive'}`}>
              <i className={`fas ${item.active === 1 ? 'fa-check-circle' : 'fa-times-circle'}`}></i> 
              {item.active === 1 ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td>
            <div className="table-actions">
              {item.active === 0 ? (
                <button className="action-btn view" onClick={(e) => { e.stopPropagation(); this.lnkEmailClick(item); }}>
                  <i className="fas fa-envelope"></i>
                </button>
              ) : (
                <button className="action-btn delete" onClick={(e) => { e.stopPropagation(); this.lnkDeactiveClick(item); }}>
                  <i className="fas fa-user-slash"></i>
                </button>
              )}
            </div>
          </td>
        </tr>
      );
    });
    
    const orderRows = orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trOrderClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total)}</td>
          <td>
            <span className={`status-badge ${item.status === 'APPROVED' ? 'active' : item.status === 'CANCELED' ? 'inactive' : 'pending'}`}>
              <i className={`fas ${item.status === 'APPROVED' ? 'fa-check-circle' : item.status === 'CANCELED' ? 'fa-times-circle' : 'fa-clock'}`}></i> {item.status}
            </span>
          </td>
        </tr>
      );
    });
    
    let orderItems = [];
    if (order) {
      orderItems = order.items.map((item, index) => {
        return (
          <tr key={item.product._id}>
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="60px" height="60px" alt="" style={{borderRadius: '8px', objectFit: 'cover'}} /></td>
            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price)}</td>
            <td>{item.quantity}</td>
            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price * item.quantity)}</td>
          </tr>
        );
      });
    }
    
    return (
      <div>
        <div className="data-table-container">
          <div className="data-table-header">
            <div className="data-table-title">
              <i className="fas fa-users"></i> Customer Management
            </div>
            <div className="data-table-actions">
              <button className="btn btn-primary" onClick={() => this.apiGetCustomers()}>
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-skeleton" style={{height: '300px'}}></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerRows}
              </tbody>
            </table>
          )}
        </div>
        
        {orders.length > 0 && (
          <div className="data-table-container">
            <div className="data-table-header">
              <div className="data-table-title">
                <i className="fas fa-shopping-cart"></i> Customer Orders
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date Created</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderRows}
              </tbody>
            </table>
          </div>
        )}
        
        {order && (
          <div className="data-table-container">
            <div className="data-table-header">
              <div className="data-table-title">
                <i className="fas fa-info-circle"></i> Order Details
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderItems}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" style={{textAlign: 'right', fontWeight: 'bold'}}>Total:</td>
                  <td style={{fontWeight: 'bold'}}>{order && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  
  trOrderClick(item) {
    this.setState({ order: item });
  }
  
  lnkDeactiveClick(item) {
    if (window.confirm('Are you sure you want to deactivate this account?')) {
      this.apiPutCustomerDeactive(item._id, item.token);
    }
  }
  
  lnkEmailClick(item) {
    if (window.confirm('Send activation email to this customer?')) {
      this.apiGetCustomerSendmail(item._id);
    }
  }
  
  // apis
  apiGetCustomers() {
    this.setState({ loading: true });
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result, loading: false });
    }).catch(err => {
      this.setState({ loading: false });
      console.error('Error loading customers:', err);
    });
  }
  
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Account deactivated successfully!');
        this.apiGetCustomers();
      } else {
        alert('Error! An issue occurred. Please try again later.');
      }
    });
  }
  
  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Customer;