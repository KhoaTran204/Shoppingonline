import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
      loading: true
    };
  }
  
  componentDidMount() {
    this.apiGetOrders();
    // Loading effect
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  }
  
  render() {
    const { orders, order, loading } = this.state;
    
    const orderRows = orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
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
          <td>
            <div className="table-actions">
              {item.status === 'PENDING' ? (
                <>
                  <button className="action-btn view" onClick={(e) => { e.stopPropagation(); this.lnkApproveClick(item._id); }}>
                    <i className="fas fa-check"></i>
                  </button>
                  <button className="action-btn delete" onClick={(e) => { e.stopPropagation(); this.lnkCancelClick(item._id); }}>
                    <i className="fas fa-times"></i>
                  </button>
                  <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${item.customer.email}`; }}>
                    <i className="fas fa-envelope"></i>
                  </button>
                </>
              ) : (
                <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${item.customer.email}`; }}>
                  <i className="fas fa-envelope"></i>
                </button>
              )}
            </div>
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
              <i className="fas fa-shopping-cart"></i> Order Management
            </div>
            <div className="data-table-actions">
              <button className="btn btn-primary">
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
                  <th>Date Created</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderRows}
              </tbody>
            </table>
          )}
        </div>
        
        {order && (
          <div className="data-table-container">
            <div className="data-table-header">
              <div className="data-table-title">
                <i className="fas fa-info-circle"></i> Order Details #{order._id}
              </div>
              <div className="data-table-actions">
                <button className="btn btn-email" onClick={() => window.location.href = `mailto:${order.customer.email}`}>
                  <i className="fas fa-envelope"></i> Send Email
                </button>
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
                  <td style={{fontWeight: 'bold'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  
  lnkApproveClick(id) {
    if (window.confirm('Are you sure you want to approve this order?')) {
      this.apiPutOrderStatus(id, 'APPROVED');
    }
  }
  
  lnkCancelClick(id) {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      this.apiPutOrderStatus(id, 'CANCELED');
    }
  }
  
  // apis
  apiGetOrders() {
    this.setState({ loading: true });
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result, loading: false });
    }).catch(err => {
      this.setState({ loading: false });
      console.error('Error loading orders:', err);
    });
  }
  
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('Error! An issue occurred. Please try again later.');
      }
    });
  }
}

export default Order;