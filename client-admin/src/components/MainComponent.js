import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';

class Main extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    if (this.context.token !== '') {
      return (
        <div className="admin-layout">
          <Menu />
          <main className="admin-main">
            <header className="admin-header">
              <div className="header-left">
                <h1 className="page-title">Dashboard</h1>
              </div>
              <div className="header-right">
                <div className="header-search">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Search..." />
                </div>
                <div className="header-notifications">
                  <i className="fas fa-bell"></i>
                  <span className="notification-badge">3</span>
                </div>
              </div>
            </header>
            
            <div className="admin-content">
              <Routes>
                <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
                <Route path='/admin/home' element={<Home />} />
                <Route path='/admin/category' element={<Category />} />
                <Route path='/admin/product' element={<Product />} />
                <Route path='/admin/order' element={<Order />} />
                <Route path='/admin/customer' element={<Customer />} />
              </Routes>
            </div>
          </main>
        </div>
      );
    }
    return (<div />);
  }
}
export default Main;