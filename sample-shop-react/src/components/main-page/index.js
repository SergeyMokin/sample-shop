import React, { Component } from 'react';
import Constants from '../../constants';
import Content from '../content';
import AuthPage from '../auth-page';

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
    }

    logout() {
        localStorage.removeItem(Constants.LOCAL_STORAGE_USER);
        localStorage.removeItem(Constants.LOCAL_STORAGE_TOKEN);
        this.setState({ isLogined: false });
    }

    render() {
        return this.state.isLogined ? <Content logout={this.logout.bind(this)} /> : <AuthPage success={() => this.setState({ isLogined: true })} />;
    }
}

export default MainPage;
