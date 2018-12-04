import React, { Component } from 'react';
import Constants from '../../constants';
import './header.css';

class Header extends Component {
    isAdmin() {
        return JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).role === 'admin';
    }

    render() {
        return (
            <div className="header">
                <ul>
                    <li><a href="/">SampleProject</a>
                        <ul className="dropdown">
                            <li>Purchases List</li>
                            {this.isAdmin() ? <li>Admin Panel</li> : null}
                            <li onClick={this.props.logout}>Logout</li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;
