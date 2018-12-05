import React from 'react';
import ReactDOM from 'react-dom';
import Store from './redux/store';
import MainPage from './components/main-page';

ReactDOM.render(<MainPage store={Store} />, document.getElementById('root'));