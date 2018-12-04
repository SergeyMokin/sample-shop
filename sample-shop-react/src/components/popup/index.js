import React, { Component } from 'react';
import './popup.css';

export default class Popup extends Component {
    render() {
        setTimeout(() => this.props.close(), this.props.time);
        return (
            <div className='popup'>
                    <h3>{this.props.text}</h3>
            </div>
        );
    }
}