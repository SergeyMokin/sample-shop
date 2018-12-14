import React, { Component } from 'react';
import './index.css';
import Api from '../../../api';
import Constants from '../../../constants';
import Popup from '../../popup';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)),
            isChangePassword: false,
            isEdit: false,
            password: '',
            email: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).email,
            lastName: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).lastName,
            firstName: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).firstName,
            pictureRef: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).pictureRef,
            error: null
        }

        this.api = new Api();
    }

    async edit(isPassword = false) {
        let user = {
            _id: this.state.user._id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            pictureRef: this.state.pictureRef,
            role: this.state.user.role
        };

        if (isPassword) user.password = this.state.password;

        let result = await this.api.editUser(user);

        if (result.status && result.message) {
            this.setState({ error: result.message });
            return;
        }

        localStorage.setItem(Constants.LOCAL_STORAGE_TOKEN, JSON.stringify(result.token));
        localStorage.setItem(Constants.LOCAL_STORAGE_USER, JSON.stringify(result.user));

        this.setState({
            user: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)),
            isChangePassword: false,
            isEdit: false,
            password: '',
            email: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).email,
            lastName: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).lastName,
            firstName: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).firstName,
            pictureRef: JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).pictureRef,
            error: null
        })
    }

    async enterPressed(e, isPassword = false) {
        if (e.key === 'Enter') this.edit(isPassword);
    }

    render() {
        let user = this.state.user;

        let content = !(this.state.isChangePassword || this.state.isEdit) ? (
            <div className="card-item">
                <div className="img" style={{ backgroundImage: `url(${user.pictureRef ? user.pictureRef : require('../../../content/no-image.png')})` }}></div>
                <div className="fullname">{user.firstName} {user.lastName}</div>
                <div className="email">{user.email}</div>
                <div className="buttons">
                    <button onClick={() => this.setState({ isChangePassword: false, isEdit: true })}> Edit </button>
                    <button onClick={() => this.setState({ isChangePassword: true, isEdit: false })}> Change password </button>
                </div>
                {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
            </div>
        )
            : this.state.isChangePassword ? (
                <div className="change">
                    <input placeholder="New password" type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} onKeyPress={(e) => this.enterPressed(e, true)} />
                    <button onClick={() => this.edit(true)}>Change</button>
                    <button onClick={() => this.setState({ isChangePassword: false, isEdit: false })}> Cancel </button>
                    {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
                </div>
            )
                : this.state.isEdit ? (
                    <div className="change">
                        <input placeholder="First name" type="text" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />
                        <input placeholder="Last name" type="text" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />
                        <input placeholder="Email" type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />
                        <input placeholder="Picture ref" type="text" value={this.state.pictureRef} onChange={(e) => this.setState({ pictureRef: e.target.value })} onKeyPress={(e) => this.enterPressed(e)} />
                        <button onClick={() => this.edit(false)}>Change</button>
                        <button onClick={() => this.setState({ isChangePassword: false, isEdit: false })}> Cancel </button>
                        {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
                    </div>
                )
                    : (
                        <div>No content</div>
                    )

        return content;
    }
}

export default Profile;
