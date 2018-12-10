import React, { Component } from 'react';
import Users from './users';
import Purchases from './purchases';
import './index.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUsers: false
        }
    }

    render() {
        return (
            <div className="admin">
                <div className="admin-routes">
                    <button onClick={() => this.setState({ isUsers: false })}>Purchases</button>
                    <button onClick={() => this.setState({ isUsers: true })}>Users</button>
                </div>
                {this.state.isUsers ? <Users store={this.props.store}/> : <Purchases store={this.props.store} />}
            </div>
        )
    }
}

export default Admin;
