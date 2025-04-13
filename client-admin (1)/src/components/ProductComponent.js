import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
      loading: true,
      showForm: false
    };
  }
  
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
    // Loading effect
    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  }
  
  render() {
    const { loading, products, curPage, noPages, itemSelected, showForm } = this.state;
    
    const prods = products && products.length > 0 ? products.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name || 'N/A'}</td>
          <td>{item.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) : '0'}</td>
          <td>{item.cdate ? new Date(item.cdate).toLocaleString() : 'N/A'}</td>
          <td>
            <span className="status-badge active">
              <i className="fas fa-tag"></i> {item.category?.name || 'N/A'}
            </span>
          </td>
          <td>
            {item.image ? (
              <img src={`data:image/jpg;base64,${item.image}`} width="60px" height="60px" alt="" style={{borderRadius: '8px', objectFit: 'cover'}} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </td>
          <td>
            <div className="table-actions">
              <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); this.trItemClick(item); }}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="action-btn view" onClick={(e) => { e.stopPropagation(); window.open("/product/" + item._id, "_blank"); }}>
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </td>
        </tr>
      );
    }) : (
      <tr>
        <td colSpan="7" className="text-center">No products found</td>
      </tr>
    );
    
    const pagination = Array.from({ length: noPages }, (_, index) => {
      const pageNum = index + 1;
      return (
        <button 
          key={index} 
          className={`btn ${pageNum === curPage ? 'btn-primary' : 'btn-light'}`}
          onClick={() => this.lnkPageClick(pageNum)}
        >
          {pageNum}
        </button>
      );
    });
    
    return (
      <div>
        <div className="data-table-container">
          <div className="data-table-header">
            <div className="data-table-title">
              <i className="fas fa-box"></i> Product Management
            </div>
            <div className="data-table-actions">
              <button 
                className="btn btn-success btn-add" 
                onClick={() => {
                  this.setState({ 
                    itemSelected: { 
                      _id: '', 
                      name: '', 
                      price: 0, 
                      category: { _id: '', name: '' }, 
                      image: '' 
                    },
                    showForm: true
                  });
                }}
              >
                <i className="fas fa-plus-circle"></i> Add Product
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
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Date Created</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prods}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7">
                    <div className="pagination">
                      {pagination}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        
        {(showForm || itemSelected) && (
          <ProductDetail 
            item={itemSelected} 
            curPage={curPage} 
            updateProducts={this.updateProducts} 
            onClose={() => this.setState({ showForm: false, itemSelected: null })}
          />
        )}
      </div>
    );
  }
  
  updateProducts = () => {
    // Gọi API để lấy danh sách sản phẩm mới nhất
    this.apiGetProducts(this.state.curPage);
  }
  
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  
  trItemClick(item) {
    this.setState({ itemSelected: item, showForm: true });
  }
  
  apiGetProducts(page) {
    this.setState({ loading: true });
    const config = { headers: { 'x-access-token': this.context.token } };
    
    // Log thông tin request
    console.log('Fetching products for page:', page);
    
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      
      // Log dữ liệu nhận được để debug
      console.log('Products received:', result.products);
      
      this.setState({ 
        products: result.products, 
        noPages: result.noPages, 
        curPage: result.curPage,
        loading: false,
        showForm: false,
        itemSelected: null
      });
    }).catch(err => {
      this.setState({ loading: false });
      console.error('Error loading products:', err);
    });
  }
}

export default Product;