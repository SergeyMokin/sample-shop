import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './index.css';

class Popup extends Component {
    render() {
        setTimeout(() => this.props.close(), this.props.time);
        return (
            <div className='popup'>
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