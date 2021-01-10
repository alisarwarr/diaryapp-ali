import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/Style.scss';
//REDUX-TOOLKIT
import store from './toolkit/store';
import { Provider } from 'react-redux';
//MIRAGEJS
import server from './server';


server();


ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
, document.getElementById("root"));