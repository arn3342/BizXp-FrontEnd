import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";
import App from '../App';
import Login from './Login/login';
import { Provider } from 'react-redux';
import store from '../store';

class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMain: false,
            defaultRedirect: 'login'
        }
    }
    render() {
        return (
<Provider store={store}>
            <Router>
                <Switch>
                    <Redirect exact from="/" to={this.state.defaultRedirect} />
                    <Route exact path="/home" component={App}/>
                    {this.state.showMain && <Redirect to="/home"/>}
                    <Route exact path="/login" component={() => <Login loginSuccess={() => this.navigateToMain()}/>} />
                </Switch>
            </Router>
            </Provider>
        )
    }
    navigateToMain(){
        this.setState({
            showMain: true
        })
    }
}
export default AppRouter;