import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';
import MainPage from './components/main-page';

ReactDOM.render(<Provider store={Store}><MainPage /></Provider>, document.getElementById('root'));