import React, { Component } from 'react';
import PurchasesList from '../purchases-list'
import Basket from '../basket';
import { Route, Switch } from "react-router-dom";
import './index.css';

class MainContent extends Component {
    render() {
        return (
            <div className="mn-cnt">
                <Switch>
                    <Route exact={true} path="/" component={() => <PurchasesList store={this.props.store} />} />
                    <Route exact={true} path="/admin-panel" component={() => <PurchasesList store={this.props.store} />} />
                    <Route exact={true} path="/basket" component={() => <Basket store={this.props.store} />} />
                    <Route component={() => <PurchasesList store={this.props.store} />} />
                </Switch>
            </div>
        )
    }
}

export default MainContent;
