import React, { Component } from 'react';
import Api from '../../../api';
import Popup from '../../popup';
import {addToBasket} from '../../../redux/actions';
import './index.css';

class PurchasesList extends Component {
    constructor(props) {
        super(props);
        this.api = new Api();
        this.state = {
            isLoading: false,
            purchases: [],
            error: null
        }
    }

    async componentDidMount() {
        await this.getPurchases();
    }

    async getPurchases() {
        if (this.state.isLoading) return;
        this.setState({
            isLoading: true
        });

        let result = await this.api.getPurchases();

        if (result.status && result.message) {
            this.setState({
                error: result.message,
                isLoading: false
            });
            return;
        }

        this.setState({
            purchases: result,
            isLoading: false
        });
    }

    addToBasket(p){
        this.props.store.dispatch(addToBasket(p));
    }

    renderCard(p) {
        return (
            <div key={p._id} style={ { backgroundImage: `url(${p.pictureRef ? p.pictureRef : require('../../../content/no-image.png')})` } } className="card-item">
                <div className="title">{p.title}</div>
                <div className="add-btn"><button onClick={() => this.addToBasket(p)}>+{p.cost}$</button></div> 
            </div>
        );
    }

    render() {
        return (
            <div className="pchs-lst">
                {this.state.purchases.map(this.renderCard.bind(this))}
                {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
            </div>
        )
    }
}

export default PurchasesList;
