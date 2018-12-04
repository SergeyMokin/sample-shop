import React, { Component } from 'react';
import Login from './login';
import Register from './register';
import './index.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    }
  }

  renderContainer(content) {
    return (
      <div className="container">
        <div className="photo-content">
        </div>
        <div className="main-auth-content">
          <div className="nav-bar">
            <button onClick={() => this.setState({ isLogin: true })}>Login</button>
            <button onClick={() => this.setState({ isLogin: false })}>Registration</button>
          </div>
          <div className="auth-content">
            {content}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isLogin) {
      return this.renderContainer(<Login success={this.props.success} />);
    }

    return this.renderContainer(<Register success={this.props.success} />);
  }
}

export default Auth;
