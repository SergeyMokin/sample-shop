import React, { Component } from 'react';
import Api from '../../../api';
import { clearUserBasket, deleteFromBasket, addToBasket } from '../../../redux/actions';
import Popup from '../../popup';
import './index.css';

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: window.groupBy(this.props.store.getState().reduce, x => x._id),
            totalLength: this.props.store.getState().reduce.length,
            error: null,
            completed: false
        }
        this.unsubscribe = this.props.store.subscribe(() => this.setState({
            purchases: window.groupBy(this.props.store.getState().reduce, x => x._id),
            totalLength: this.props.store.getState().reduce.length
        }));
        this.api = new Api();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderList(p) {
        return (
            <div key={p.key} className="card-item">
                <div className="img" style={{ backgroundImage: `url(${p.values[0].pictureRef ? p.values[0].pictureRef : require('../../../content/no-image.png')})` }}></div>
                <div className="title">{p.values[0].title} - {p.values[0].cost}$</div>
                <div className="buttons">
                    <button onClick={() => this.delete(p.key)}> - </button>
                    <div className="count">{p.values.length}</div>
                    <button onClick={() => this.add(p.values[0])}> + </button>
                </div>
            </div>
        );
    }

    async delete(id) {
        await this.props.store.dispatch(deleteFromBasket(id));
    }

    async add(purchase) {
        await this.props.store.dispatch(addToBasket(purchase));
    }

    getSum() {
        let sum = 0;
        for (let p of this.state.purchases) {
            sum += p.values.length * p.values[0].cost;
        }
        return sum;
    }

    async buy() {
        let result = await this.api.buy();
        if (result.status && result.message) {
            this.setState({ error: result.message });
            return;
        }

        this.clear();
        this.setState({ completed: true });
    }

    async clear() {
        this.props.store.dispatch(clearUserBasket());
    }

    render() {
        return this.state.completed ? (
            <div className="completed-buy">Check your email and confirm the purchase.</div>
        )
            : (
                <div className="basket">
                    {this.state.purchases.length > 0 ? this.state.purchases.map(this.renderList.bind(this)) : null}
                    <div className="total">
                        <p>Total: {this.state.totalLength} products worth {this.getSum()}$.</p>
                        <button onClick={this.buy.bind(this)}>Buy</button>
                        <button onClick={this.clear.bind(this)}>Clear</button>
                    </div>
                    {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
                </div>
            );
    }
}