import React, { Component } from 'react';
import Api from '../../../api';
import Popup from '../../popup';
import './users.css';

class Users extends Component {
    constructor(props) {
        super(props);
        this.api = new Api();
        this.state = {
            users: [],
            error: null
        }
    }

    async componentDidMount() {
        let users = await this.api.getUsers();
        console.log(users)
        if (this.checkError(users)) return;
        this.setState({ users: users });
    }

    checkError(result) {
        if (result.status && result.message) {
            this.setState({ error: result.message });
            return true;
        }
        return false;
    }

    async setRole(user) {
        let role = user.role === 'admin' ? 'user' : 'admin';
        user.role = role;

        let result = await this.api.editUser(user);

        if (this.checkError(result)) return;

        result = await this.api.getUsers();

        if (this.checkError(result)) return;

        this.setState({ users: result });
    }

    async delete(id) {
        let result = await this.api.deleteUser(id);

        if (this.checkError(result)) return;

        result = await this.api.getUsers();

        if (this.checkError(result)) return;

        this.setState({ users: result });
    }

    renderUsers(user) {
        return (
            <div key={user._id} className="card-item">
                <div className="img" style={{ backgroundImage: `url(${user.pictureRef ? user.pictureRef : require('../../../content/no-image.png')})` }}></div>
                <div className="fullname">{user.firstName} {user.lastName}</div>
                <div className="email">{user.email}</div>
                <div className="buttons">
                    <button onClick={() => this.setRole(user)}> {user.role === 'user' ? 'To admin' : 'To user'} </button>
                    <button onClick={() => this.delete(user._id)}> Delete </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="users">
                {this.state.users.map(this.renderUsers.bind(this))}
                {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
            </div>
        )
    }
}

export default Users;
