import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  
  render() {
    return (
      <nav className="admin-sidebar">
        {/* Logo/Brand */}
        <div className="sidebar-brand">
          <h2><i className="fas fa-store"></i> Admin</h2>
        </div>
        
        {/* User Profile */}
        <div className="sidebar-profile">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-info">
            <p className="profile-name">{this.context.username}</p>
            <p className="profile-role">Administrator</p>
          </div>
        </div>
        
        {/* Navigation */}
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to='/admin/home'>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to='/admin/category'>
              <i className="fas fa-tags"></i>
              <span>Categories</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to='/admin/product'>
              <i className="fas fa-box"></i>
              <span>Products</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to='/admin/order'>
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to='/admin/customer'>
              <i className="fas fa-users"></i>
              <span>Customers</span>
            </Link>
          </li>
        </ul>
        
        {/* Logout */}
        <div className="sidebar-footer">
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    );
  }
  
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;