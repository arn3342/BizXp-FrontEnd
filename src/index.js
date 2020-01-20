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
import AppRouter from './components/router';

render(<AppRouter/>, document.getElementById('root'));
serviceWorker.unregister();