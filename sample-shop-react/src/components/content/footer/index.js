import React, { Component } from 'react';
import './index.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="content">
                    ©{(new Date()).getFullYear()} SampleShop
                </div>
            </div>
        )
    }
}

export default Footer;
