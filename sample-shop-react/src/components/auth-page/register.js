import React, { Component } from 'react';
import Api from '../../api';
import Popup from '../popup';
import Constants from '../../constants';
import './forms.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.api = new Api();

        this.state = {
            isLoading: false,
            email: "",
            firstName: "",
            lastName: "",
            pictureRef: "",
            password: "",
            error: null
        }
    }

    clearFields() {
        this.setState({
            isLoading: false,
            email: "",
            firstName: "",
            lastName: "",
            pictureRef: "",
            password: "",
            error: null
        });
    }

    async register() {
        if (this.state.isLoading) return;

        let result = await this.api.register({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            pictureRef: this.state.pictureRef,
            password: this.state.password
        });

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
        if (e.key === 'Enter') this.register();
    }

    render() {
        return (
            <div className="form-auth">
                <input placeholder="Email" id="reg_email" value={this.state.email} type="email" onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />

                <input placeholder="First Name" id="reg_fname" value={this.state.firstName} type="text" onChange={(e) => this.setState({ firstName: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />

                <input placeholder="Last Name" id="reg_lname" value={this.state.lastName} type="text" onChange={(e) => this.setState({ lastName: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />

                <input placeholder="Picture Ref" id="reg_pref" value={this.state.pictureRef} type="text" onChange={(e) => this.setState({ pictureRef: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />

                <input placeholder="Password" id="reg_pass" value={this.state.password} type="password" onChange={(e) => this.setState({ password: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />
                <button onClick={this.register.bind(this)} onKeyPress={event => { if (event.key === 'Enter') this.register() }}>Register</button>

                {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
            </div>
        );
    }
}

export default Register;
