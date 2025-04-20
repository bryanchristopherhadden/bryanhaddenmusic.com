import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// @ts-ignore
import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
