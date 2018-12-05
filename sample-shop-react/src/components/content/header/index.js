import React, { Component } from 'react';
import Constants from '../../../constants';
import BasketImg from '../../../content/basket.png';
import { Link } from "react-router-dom";
import './index.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basketLength: this.props.store.getState().reduce.length
        }
        this.unsubscribe = this.props.store.subscribe(() => this.setState({ basketLength: this.props.store.getState().reduce.length }));
    }

    isAdmin() {
        return JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_USER)).role === 'admin';
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        return (
            <div className="header">
                <div className="basket">
                    <Link to="/basket"><img src={BasketImg} alt={""}/></Link>
                    <span>{this.state.basketLength}</span>
                </div>
                <ul>
                    <li><span>SampleProject</span>
                        <ul className="dropdown">
                            <li><Link to="/">Purchases List</Link></li>
                            {this.isAdmin() ? <li><Link to="/admin-panel">Admin Panel</Link></li> : null}
                            <li onClick={this.props.logout}><Link to="/">Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;
