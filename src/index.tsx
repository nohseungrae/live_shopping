import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './apollo';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import TIM from 'tim-js-sdk';

let options = {
    SDKAppID: 1400522708, // Replace `0` with the `SDKAppID` of your IM app during access.
};
export const tim = TIM.create(options);

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('saralive_root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
