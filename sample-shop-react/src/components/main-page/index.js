import React, { Component } from 'react';
import Constants from '../../constants';
import Content from '../content';
import AuthPage from '../auth-page';
import Api from '../../api';
import { setBasket } from '../../redux/actions';
import { BrowserRouter as Router } from "react-router-dom";

class MainPage extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem(Constants.LOCAL_STORAGE_USER)
            && localStorage.getItem(Constants.LOCAL_STORAGE_TOKEN)) {
            this.state = {
                isLogined: true
            }
        }
        else {
            this.state = {
                isLogined: false
            };
        }

        this.api = new Api();
    }

    async getBasket() {
        let basket = await this.api.getBasket();
        if (basket.status && basket.message) return;

        this.props.store.dispatch(setBasket(basket));
    }

    logout() {
        localStorage.removeItem(Constants.LOCAL_STORAGE_USER);
        localStorage.removeItem(Constants.LOCAL_STORAGE_TOKEN);
        this.setState({ isLogined: false });
    }

    render() {
        if (this.state.isLogined) {
            this.api = new Api();
            this.getBasket();
        }
        return (
            <Router>
                {this.state.isLogined ? <Content logout={this.logout.bind(this)} store={this.props.store} /> : <AuthPage success={() => this.setState({ isLogined: true })} />}
            </Router>
        );
    }
}

export default MainPage;
