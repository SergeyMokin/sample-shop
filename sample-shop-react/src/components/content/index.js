import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import MainContent from './main-content';
import './index.css';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <div className="header">
                    <Header logout={this.props.logout} />
                </div>
                <div className="main-content">
                    <MainContent />
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Content;
