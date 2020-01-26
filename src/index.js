import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD
import AppRouter from './components/router';
=======
import Login from './components/Login/login';
>>>>>>> 4dc152a8dd7a9dc3a39b0d3cb253f5ef350c1ff3
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";
<<<<<<< HEAD
import Login from './components/Login/login';

render(
    <Login/>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



render(<AppRouter/>, document.getElementById('root'));

=======
import AppRouter from './components/router';
import { Provider } from 'react-redux';
import store from './store';

render(<Provider store={store}><AppRouter/></Provider>, document.getElementById('root'));
>>>>>>> 4dc152a8dd7a9dc3a39b0d3cb253f5ef350c1ff3
serviceWorker.unregister();