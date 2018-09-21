// import "ts-polyfill";
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import { App } from './app';

// Stylesheets
require("antd/dist/antd.css");
require("./styles/app.scss");

const renderApp = () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
};

renderApp();

if (module.hot) {
    module.hot.accept(renderApp);
}
