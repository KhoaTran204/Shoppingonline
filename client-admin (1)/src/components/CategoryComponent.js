import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
      loading: true,
      showForm: false
    };
  }
  
  componentDidMount() {
    this.apiGetCategories();
    // Loading effect
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  }
  
  render() {
    const { categories, itemSelected, loading, showForm } = this.state;
    
    const cateRows = categories.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>
            <span className="status-badge active">
              <i className="fas fa-tag"></i> {item.name}
            </span>
          </td>
          <td>
            <div className="table-actions">
              <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); this.trItemClick(item); }}>
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </td>
        </tr>
      );
    });
    
    return (
      <div>
        <div className="data-table-container">
          <div className="data-table-header">
            <div className="data-table-title">
              <i className="fas fa-tags"></i> Category Management
            </div>
            <div className="data-table-actions">
              <button 
                className="btn btn-success btn-add" 
                onClick={() => {
                  this.setState({ 
                    itemSelected: { _id: '', name: '' },
                    showForm: true
                  });
                }}
              >
                <i className="fas fa-plus-circle"></i> Add Category
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-skeleton" style={{height: '200px'}}></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cateRows}
              </tbody>
            </table>
          )}
        </div>
        
        {(showForm || itemSelected) && (
          <CategoryDetail 
            item={itemSelected} 
            updateCategories={this.updateCategories} 
            onClose={() => this.setState({ showForm: false, itemSelected: null })}
          />
        )}
      </div>
    );
  }
  
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item, showForm: true });
  }
  
  // apis
  apiGetCategories() {
    this.setState({ loading: true });
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result, loading: false });
    }).catch(err => {
      this.setState({ loading: false });
      console.error('Error loading categories:', err);
    });
  }
}

export default Category;