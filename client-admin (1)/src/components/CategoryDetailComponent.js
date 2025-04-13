import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: '',
      isSubmitting: false,
      errorMessage: ''
    };
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ 
        txtID: this.props.item._id || '', 
        txtName: this.props.item.name || '',
        errorMessage: ''
      });
    }
  }
  
  render() {
    const { txtID, txtName, isSubmitting, errorMessage } = this.state;
    
    return (
      <div className="data-table-container form-container">
        <div className="data-table-header">
          <div className="data-table-title">
            <i className="fas fa-edit"></i> Category Details
          </div>
          <div className="data-table-actions">
            <button 
              className="btn btn-close" 
              onClick={() => this.props.onClose && this.props.onClose()}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <form onSubmit={(e) => e.preventDefault()}>
          {errorMessage && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle"></i> {errorMessage}
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">ID</label>
            <input 
              type="text" 
              className="form-control" 
              value={txtID} 
              onChange={(e) => { this.setState({ txtID: e.target.value }) }} 
              readOnly={true} 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category Name</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-tag"></i>
              <input 
                type="text" 
                className="form-control" 
                value={txtName} 
                onChange={(e) => { this.setState({ txtName: e.target.value, errorMessage: '' }) }} 
                placeholder="Enter category name"
                disabled={isSubmitting}
                autoFocus={!txtID}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-add-new" 
              onClick={(e) => this.btnAddClick(e)}
              disabled={isSubmitting}
            >
              <i className="fas fa-plus-circle"></i> ADD NEW
            </button>
            
            <button 
              type="button" 
              className="btn btn-update" 
              onClick={(e) => this.btnUpdateClick(e)}
              disabled={isSubmitting || !txtID}
            >
              <i className="fas fa-sync-alt"></i> UPDATE
            </button>
            
            <button 
              type="button" 
              className="btn btn-delete" 
              onClick={(e) => this.btnDeleteClick(e)}
              disabled={isSubmitting || !txtID}
            >
              <i className="fas fa-trash-alt"></i> DELETE
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName.trim();
    
    // Validation
    if (!name) {
      this.setState({ errorMessage: 'Vui lòng nhập tên danh mục' });
      return;
    }
    
    if (name.length < 2) {
      this.setState({ errorMessage: 'Tên danh mục phải có ít nhất 2 ký tự' });
      return;
    }

    if (name.length > 50) {
      this.setState({ errorMessage: 'Tên danh mục không được vượt quá 50 ký tự' });
      return;
    }

    // Kiểm tra ký tự đặc biệt
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialChars.test(name)) {
      this.setState({ errorMessage: 'Tên danh mục không được chứa ký tự đặc biệt' });
      return;
    }
    
    this.setState({ isSubmitting: true, errorMessage: '' });
    const cate = { name: name };
    this.apiPostCategory(cate);
  }
  
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName.trim();
    
    if (!id) {
      this.setState({ errorMessage: 'Please select a category to update' });
      return;
    }
    
    if (!name) {
      this.setState({ errorMessage: 'Please enter category name' });
      return;
    }
    
    if (name.length < 2) {
      this.setState({ errorMessage: 'Category name must be at least 2 characters' });
      return;
    }
    
    this.setState({ isSubmitting: true, errorMessage: '' });
    const cate = { name: name };
    this.apiPutCategory(id, cate);
  }
  
  btnDeleteClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    
    if (!id) {
      this.setState({ errorMessage: 'Please select a category to delete' });
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this category?')) {
      this.setState({ isSubmitting: true, errorMessage: '' });
      this.apiDeleteCategory(id);
    }
  }
  
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('Thêm danh mục thành công!');
          this.setState({ 
            txtID: '', 
            txtName: '', 
            isSubmitting: false,
            errorMessage: '' 
          });
          this.apiGetCategories();
          // Đóng form sau khi thêm thành công
          if (this.props.onClose) {
            this.props.onClose();
          }
        } else {
          this.setState({ 
            errorMessage: 'Lỗi! Đã xảy ra vấn đề. Vui lòng thử lại sau.',
            isSubmitting: false 
          });
        }
      })
      .catch(err => {
        console.error('Lỗi khi thêm danh mục:', err);
        let errorMsg = 'Lỗi! Đã xảy ra vấn đề. Vui lòng thử lại sau.';
        
        if (err.response) {
          if (err.response.status === 400) {
            errorMsg = 'Lỗi! Dữ liệu không hợp lệ.';
          } else if (err.response.status === 401) {
            errorMsg = 'Lỗi! Phiên đăng nhập đã hết hạn.';
          } else if (err.response.status === 409) {
            errorMsg = 'Lỗi! Danh mục này đã tồn tại.';
          }
        }
        
        this.setState({ 
          errorMessage: errorMsg,
          isSubmitting: false 
        });
      });
  }
  
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('Category updated successfully!');
          this.setState({ isSubmitting: false });
          this.apiGetCategories();
        } else {
          this.setState({ 
            errorMessage: 'Error! An issue occurred. Please try again later.',
            isSubmitting: false 
          });
        }
      })
      .catch(err => {
        console.error('Error updating category:', err);
        this.setState({ 
          errorMessage: err.response?.data?.message || 'Error! An issue occurred. Please try again later.',
          isSubmitting: false 
        });
      });
  }
  
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('Category deleted successfully!');
          this.setState({ txtID: '', txtName: '', isSubmitting: false });
          this.apiGetCategories();
        } else {
          this.setState({ 
            errorMessage: 'Error! An issue occurred. Please try again later.',
            isSubmitting: false 
          });
        }
      })
      .catch(err => {
        console.error('Error deleting category:', err);
        this.setState({ 
          errorMessage: err.response?.data?.message || 'Error! An issue occurred. Please try again later.',
          isSubmitting: false 
        });
      });
  }
  
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config)
      .then((res) => {
        const result = res.data;
        this.props.updateCategories(result);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        this.setState({ 
          errorMessage: 'Error! Failed to refresh categories list.',
          isSubmitting: false 
        });
      });
  }
}

export default CategoryDetail;