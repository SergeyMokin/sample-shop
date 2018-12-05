import React, { Component } from 'react';
import Api from '../../../api';
import { clearUserBasket } from '../../../redux/actions';
import './index.css';

function groupBy(array, selector) {
    let uniqueKeys = array.map(selector).filter((value, index) => array.map(selector).indexOf(value) === index);
    let arr = [];
    for (let key of uniqueKeys) {
        let res = { key: key, values: [] };
        for (let el of array) {
            if (selector(el) === key) {
                res.values.push(el);
            }
        }
        arr.push(res);
    }
    return arr;
}

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: groupBy(this.props.store.getState().reduce, x => x._id)
        }
        this.unsubscribe = this.props.store.subscribe(() => this.setState({ purchases: groupBy(this.props.store.getState().reduce, x => x._id) }));
        this.api = new Api();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderList(p) {
        return (
            <div key={p.key}>
                {p.values[0].title} - {p.values.length} * {p.values[0].cost}$
            </div>
        );
    }

    getSum() {
        let sum = 0;
        for (let p of this.state.purchases) {
            sum += p.values.length * p.values[0].cost;
        }
        return sum;
    }

    async buy(){
        let result = await this.api.buy();
        if(result.status && result.message) return;

        this.props.store.dispatch(clearUserBasket());
    }

    render() {
        return (
            <div className="basket">
                {this.state.purchases.length > 0 ? this.state.purchases.map(this.renderList) : null}
                total => {this.getSum()}$
                <button onClick={this.buy.bind(this)}>Buy</button>
            </div>
        );
    }
}