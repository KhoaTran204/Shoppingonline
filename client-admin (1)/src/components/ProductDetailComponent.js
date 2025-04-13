import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtName: '',
      txtPrice: '',
      cmbCategory: '',
      fileImage: null,
      categories: [],
      isSubmitting: false,
      errorMessage: '',
      successMessage: '',
      imagePreview: null
    };
  }
  
  componentDidMount() {
    this.apiGetCategories();
    if (this.props.item && this.props.item._id) {
      this.setState({
        txtName: this.props.item.name || '',
        txtPrice: this.props.item.price ? this.props.item.price.toString() : '',
        cmbCategory: this.props.item.category?._id || '',
        imagePreview: this.props.item.image ? `data:image/jpg;base64,${this.props.item.image}` : null
      });
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      if (this.props.item && this.props.item._id) {
        this.setState({
          txtName: this.props.item.name || '',
          txtPrice: this.props.item.price ? this.props.item.price.toString() : '',
          cmbCategory: this.props.item.category?._id || '',
          imagePreview: this.props.item.image ? `data:image/jpg;base64,${this.props.item.image}` : null,
          errorMessage: '',
          successMessage: ''
        });
      } else {
        this.setState({
          txtName: '',
          txtPrice: '',
          cmbCategory: '',
          imagePreview: null,
          errorMessage: '',
          successMessage: ''
        });
      }
    }
  }
  
  render() {
    const { isSubmitting, errorMessage, successMessage, imagePreview } = this.state;
    
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{this.props.item._id ? 'Edit Product' : 'Add New Product'}</h2>
            <button className="btn-close" onClick={this.props.onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="modal-body">
            {errorMessage && (
              <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle"></i> {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="alert alert-success">
                <i className="fas fa-check-circle"></i> {successMessage}
              </div>
            )}
            
            <div className="form-group">
              <label>Product Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={this.state.txtName} 
                onChange={(e) => this.setState({ txtName: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="form-group">
              <label>Price (VND)</label>
              <div className="input-group">
                <input 
                  type="number" 
                  className="form-control" 
                  value={this.state.txtPrice} 
                  onChange={(e) => this.setState({ txtPrice: e.target.value })}
                  placeholder="Enter price"
                />
                <div className="input-group-append">
                  <span className="input-group-text">VND</span>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-control" 
                value={this.state.cmbCategory} 
                onChange={(e) => this.setState({ cmbCategory: e.target.value })}
              >
                <option value="">-- Select Category --</option>
                {this.state.categories.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="form-group">
              <label>Product Image</label>
              <div 
                className="image-upload-container"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Click to upload image</span>
                    </div>
                  )}
                </div>
                <input 
                  id="fileInput"
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => this.handleFileImageChange(e)}
                  className="file-input"
                />
              </div>
              <small className="form-text text-muted">
                Recommended size: 800x800px, max 2MB
              </small>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="btn btn-secondary" 
              onClick={this.props.onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            {this.props.item._id ? (
              <button 
                className="btn btn-primary" 
                onClick={() => this.btnUpdateClick()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Updating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> Update
                  </>
                )}
              </button>
            ) : (
              <button 
                className="btn btn-success" 
                onClick={() => this.btnAddClick()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Adding...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus"></i> Add
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // event-handlers
  handleFileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Kiểm tra kích thước file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.setState({ errorMessage: 'Kích thước ảnh không được vượt quá 5MB' });
      return;
    }
    
    // Chuyển đổi file thành base64
      const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      // Lưu base64 vào state
      this.setState({ 
        fileImage: base64,
        imagePreview: base64
      });
    };
    reader.readAsDataURL(file);
  }
  
  btnAddClick() {
    const { txtName, txtPrice, cmbCategory, fileImage } = this.state;
    
    // Kiểm tra dữ liệu đầu vào
    if (!txtName || txtName.length < 2) {
      this.setState({ errorMessage: 'Tên sản phẩm phải có ít nhất 2 ký tự' });
      return;
    }
    
    // Kiểm tra giá
    const price = parseFloat(txtPrice);
    if (isNaN(price) || price <= 0) {
      this.setState({ errorMessage: 'Giá sản phẩm phải là số dương' });
      return;
    }
    
    if (!cmbCategory) {
      this.setState({ errorMessage: 'Vui lòng chọn danh mục sản phẩm' });
      return;
    }
    
    if (!fileImage) {
      this.setState({ errorMessage: 'Vui lòng chọn ảnh sản phẩm' });
      return;
    }
    
    this.setState({ isSubmitting: true, errorMessage: '' });
    
    // Gửi dữ liệu sản phẩm
    const productData = {
      name: txtName,
      price: price,
      category: cmbCategory,
      image: fileImage.split(',')[1] // Lấy phần base64 (bỏ phần data:image/...)
    };
    
    // Log dữ liệu được gửi đi
    console.log('Sending product data:', {
      name: txtName,
      price: price,
      category: cmbCategory,
      image: 'base64_data' // Không log toàn bộ base64 string
    });
    
    // Gọi API thêm sản phẩm
    const config = { 
      headers: { 
        'x-access-token': this.context.token,
        'Content-Type': 'application/json'
      } 
    };
    
    axios.post('/api/admin/products', productData, config)
      .then((res) => {
        console.log('Server response:', res.data);
        this.setState({ 
          successMessage: 'Thêm sản phẩm thành công!',
          isSubmitting: false,
          txtName: '',
          txtPrice: '',
          cmbCategory: '',
          fileImage: null,
          imagePreview: null
        });
        
        // Cập nhật danh sách sản phẩm
        this.props.updateProducts();
        
        // Đóng form sau 1.5 giây
        setTimeout(() => {
          this.props.onClose();
        }, 1500);
      })
      .catch(err => {
        console.error('Error adding product:', err);
        this.setState({ 
          errorMessage: err.response?.data?.message || 'Có lỗi xảy ra khi thêm sản phẩm',
          isSubmitting: false
        });
      });
  }
  
  btnUpdateClick() {
    const { txtName, txtPrice, cmbCategory, fileImage } = this.state;
    
    if (!txtName || txtName.length < 2) {
      this.setState({ errorMessage: 'Tên sản phẩm phải có ít nhất 2 ký tự' });
      return;
    }
    
    const price = parseFloat(txtPrice);
    if (isNaN(price) || price <= 0) {
      this.setState({ errorMessage: 'Giá sản phẩm phải lớn hơn 0' });
      return;
    }
    
    if (!cmbCategory) {
      this.setState({ errorMessage: 'Vui lòng chọn danh mục sản phẩm' });
      return;
    }
    
    this.setState({ isSubmitting: true, errorMessage: '' });
    
    // Tạo object dữ liệu sản phẩm
    const productData = {
      name: txtName,
      price: price,
      category: cmbCategory
    };
    
    // Nếu có ảnh mới, thêm vào dữ liệu
    if (fileImage && fileImage.startsWith('data:image')) {
      productData.image = fileImage.split(',')[1]; // Lấy phần base64 (bỏ phần data:image/...)
    }
    
    // Log dữ liệu được gửi đi
    console.log('Updating product data:', {
      id: this.props.item._id,
      name: txtName,
      price: price,
      category: cmbCategory,
      hasNewImage: !!fileImage
    });
    
    // Gọi API cập nhật sản phẩm
    const config = { 
      headers: { 
        'x-access-token': this.context.token,
        'Content-Type': 'application/json'
      } 
    };
    
    axios.put('/api/admin/products/' + this.props.item._id, productData, config)
      .then((res) => {
        console.log('Server response (update):', res.data);
        this.setState({ 
          successMessage: 'Cập nhật sản phẩm thành công!',
          isSubmitting: false
        });
        
        // Cập nhật danh sách sản phẩm
        this.props.updateProducts();
        
        // Đóng form sau 1.5 giây
        setTimeout(() => {
          this.props.onClose();
        }, 1500);
      })
      .catch(err => {
        console.error('Error updating product:', err);
        this.setState({ 
          errorMessage: err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật sản phẩm',
          isSubmitting: false
        });
      });
  }
  
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.setState({ categories: res.data });
    }).catch(err => {
      this.setState({ errorMessage: 'Không thể tải danh sách danh mục' });
    });
  }
}

export default ProductDetail;