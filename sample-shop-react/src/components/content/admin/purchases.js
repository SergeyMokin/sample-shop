import React, { Component } from 'react';
import Api from '../../../api';
import Popup from '../../popup';
import './purchases.css';

class Purchases extends Component {
    constructor(props) {
        super(props);
        this.api = new Api();
        this.state = {
            purchases: [],
            error: null,
            added: null,
            editable: null,
            title: null,
            cost: null,
            pictureRef: null
        }
    }

    async componentDidMount() {
        let purchases = await this.api.getPurchases();
        if (this.checkError(purchases)) return;
        this.setState({ purchases: purchases });
    }

    setEdit(p) {
        if (p) this.setState({ editable: p, title: p.title, cost: p.cost, pictureRef: p.pictureRef });
        else this.setState({ editable: null, title: null, cost: null, pictureRef: null });
    }

    setAdded(p) {
        if (p) this.setState({ added: {}, title: '', cost: 0, pictureRef: '' });
        else this.setState({ added: null, title: null, cost: null, pictureRef: null });
    }

    async edit() {
        let result = await this.api.editPurchase({
            _id: this.state.editable._id,
            title: this.state.title,
            description: this.state.editable.description,
            cost: this.state.cost,
            pictureRef: this.state.pictureRef
        });

        if (this.checkError(result)) return;

        result = await this.api.getPurchases();

        if (this.checkError(result)) return;

        this.setState({ purchases: result });

        this.setEdit(null);
    }

    async add() {
        let result = await this.api.addPurchase({
            title: this.state.title,
            description: this.state.title,
            cost: this.state.cost,
            pictureRef: this.state.pictureRef
        });

        if (this.checkError(result)) return;

        result = await this.api.getPurchases();

        if (this.checkError(result)) return;

        this.setState({ purchases: result });

        this.setAdded(null);
    }

    checkError(result) {
        if (result.status && result.message) {
            this.setState({ error: result.message });
            return true;
        }
        return false;
    }

    async delete(id) {
        let result = await this.api.deletePurchase(id);

        if (this.checkError(result)) return;

        result = await this.api.getPurchases();

        if (this.checkError(result)) return;

        this.setState({ purchases: result });
    }

    renderEdit(p){
        return (
            <div key={p._id} className="card-item">
                <input placeholder="Img Url" type="text" value={this.state.pictureRef} onChange={(e) => this.setState({ pictureRef: e.target.value })} />
                <input placeholder="Title" type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                <input placeholder="Cost" type="number" value={this.state.cost} onChange={(e) => this.setState({ cost: e.target.value })} />
                <div className="buttons">
                    <button onClick={this.state.editable ? this.edit.bind(this) : this.add.bind(this)}> Ok </button>
                    <button onClick={() => this.state.editable ? this.setEdit(null) : this.setAdded(null)}> Cancel </button>
                </div>
            </div>
        )
    }

    renderPurchases(p) {
        if (this.state.editable !== null && this.state.editable._id === p._id) {
            return this.renderEdit(p);
        }
        return (
            <div key={p._id} className="card-item">
                <div className="img" style={{ backgroundImage: `url(${p.pictureRef ? p.pictureRef : require('../../../content/no-image.png')})` }}></div>
                <div className="title">{p.title}</div>
                <div className="cost">{p.cost}$</div>
                <div className="buttons">
                    <button onClick={() => {
                        this.setAdded(null);
                        this.setEdit(p);
                    }}> Edit </button>
                    <button onClick={() => this.delete(p._id)}> Delete </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="purchases">
                <div className="add">
                    <button onClick={() => {
                        this.setEdit(null);
                        this.setAdded({});
                    }}>Add</button>
                </div>
                {this.state.added ? this.renderEdit(this.state.added) : null}
                {this.state.purchases.map(this.renderPurchases.bind(this))}
                {this.state.error ? <Popup time={1200} text={this.state.error} close={() => this.setState({ error: null })} /> : null}
            </div>
        )
    }
}

export default Purchases;
