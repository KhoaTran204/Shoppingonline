import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'admin',
      txtPassword: '123456',
      isLoading: false,
      errorMessage: '',
      showPassword: false
    };
  }

  componentDidMount() {
    // Thêm hiệu ứng fade-in khi component được mount
    document.querySelector('.login-container').classList.add('fade-in');
  }

  render() {
    if (this.context.token === '') {
      return (
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo">
                <i className="fas fa-user-shield"></i>
              </div>
              <h2>ADMIN LOGIN</h2>
              <p>Vui lòng đăng nhập để tiếp tục</p>
            </div>
            
            {this.state.errorMessage && (
              <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle"></i> {this.state.errorMessage}
              </div>
            )}
            
            <form onSubmit={(e) => this.btnLoginClick(e)}>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="username"
                    placeholder="Tên đăng nhập"
                    value={this.state.txtUsername}
                    onChange={(e) => { 
                      this.setState({ 
                        txtUsername: e.target.value,
                        errorMessage: '' 
                      }) 
                    }}
                    disabled={this.state.isLoading}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Mật khẩu"
                    value={this.state.txtPassword}
                    onChange={(e) => { 
                      this.setState({ 
                        txtPassword: e.target.value,
                        errorMessage: '' 
                      }) 
                    }}
                    disabled={this.state.isLoading}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                  >
                    <i className={`fas ${this.state.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <button
                  type="submit"
                  className="btn-login"
                  disabled={this.state.isLoading}
                >
                  {this.state.isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> ĐANG ĐĂNG NHẬP...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt"></i> ĐĂNG NHẬP
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="login-footer">
              <p>© 2025 Admin Panel. All rights reserved.</p>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername.trim();
    const password = this.state.txtPassword;
    
    if (!username) {
      this.setState({ errorMessage: 'Vui lòng nhập tên đăng nhập' });
      return;
    }
    
    if (!password) {
      this.setState({ errorMessage: 'Vui lòng nhập mật khẩu' });
      return;
    }
    
    this.setState({ isLoading: true, errorMessage: '' });
    const account = { username: username, password: password };
    this.apiLogin(account);
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account)
      .then((res) => {
        const result = res.data;
        if (result.success === true) {
          this.context.setToken(result.token);
          this.context.setUsername(account.username);
        } else {
          this.setState({ 
            errorMessage: result.message || 'Tên đăng nhập hoặc mật khẩu không đúng',
            isLoading: false 
          });
        }
      })
      .catch(err => {
        console.error('Lỗi đăng nhập:', err);
        this.setState({ 
          errorMessage: 'Lỗi kết nối. Vui lòng thử lại sau.',
          isLoading: false 
        });
      });
  }
}

export default Login;