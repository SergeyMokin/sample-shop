import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './index.css';

class Popup extends Component {
    constructor(props){
        super(props);
        this.class = this.props.class ? this.props.class : "popup";
    }

    render() {
        setTimeout(() => this.props.close(), this.props.time);
        return (
            <div className={this.class}>
                <h3>{this.props.text}</h3>
            </div>
        );
    }
}

Popup.propTypes = {
    close: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

export default Popup;