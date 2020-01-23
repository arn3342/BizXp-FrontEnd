import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';
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
=======
import AppRouter from './components/router';

render(<AppRouter/>, document.getElementById('root'));
>>>>>>> 765a5d787adc7bd79081abad893230f7b7a06446
serviceWorker.unregister();