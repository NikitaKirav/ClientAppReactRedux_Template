import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store.js';
import { Provider } from 'react-redux';

render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,        
    document.querySelector('#root')
)