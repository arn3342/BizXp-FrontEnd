import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';
import Login from './components/Login/login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";
import AppRouter from './components/router';
import { Provider } from 'react-redux';
import store from './store';

render(<Provider store={store}><AppRouter/></Provider>, document.getElementById('root'));
serviceWorker.unregister();