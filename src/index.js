import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
  