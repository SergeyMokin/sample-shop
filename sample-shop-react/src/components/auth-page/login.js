import React, { Component } from 'react';
import Api from '../../api';
import Popup from '../popup';
import Constants from '../../constants';
import './forms.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.api = new Api();

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            error: null
        }
    }

    clearFields() {
        this.setState({
            isLoading: false,
            email: "",
            password: "",
            error: null
        });
    }

    async login() {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });

        let result = await this.api.login({ email: this.state.email, password: this.state.password });

        if (result.status && result.message) {
            this.setState({
                error: result.message,
                isLoading: false
            });
            return;
        }

        localStorage.setItem(Constants.LOCAL_STORAGE_TOKEN, JSON.stringify(result.token));
        localStorage.setItem(Constants.LOCAL_STORAGE_USER, JSON.stringify(result.user));

        this.clearFields();

        if (this.props.success) this.props.success();
    }

    enterPressed(e) {
        if (e.key === 'Enter') this.login();
    }

    render() {
        return (
            <div className="form-auth">
                <input placeholder="Email" id="lin_email" type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />

                <input placeholder="Password" id="lin_pass" type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />

                <button onClick={this.login.bind(this)}>Login</button>

                {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
            </div>
        );
    }
}

export default Login;
