import React, { Component } from 'react';
import Api from '../../api';
import Constants from '../../constants';

class MainContent extends Component {
    constructor(props){
        super(props);
        let token = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_TOKEN));
        this.api = new Api(token);
    }

    async getPurchases(){
        console.log(await this.api.getPurchases());
    }

    render() {
        return (
            <div> <button onClick={this.props.logout}>logout</button> <button onClick={this.getPurchases.bind(this)}>try api</button> </div>
        )
    }
}

export default MainContent;
