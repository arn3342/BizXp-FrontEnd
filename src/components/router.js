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
            <Router>
                <Switch>
                    <Redirect exact from="/" to={this.state.defaultRedirect} />
                    <Route exact path="/home" component={App}/>
                    {this.state.showMain && <Redirect to="/home"/>}
                    <Route exact path="/login" component={() => <Login loginSuccess={() => this.navigateToMain()}/>} />
                </Switch>
            </Router>
        )
    }
    navigateToMain(){
        this.setState({
            showMain: true
        })
        document.body.style.background = 'none'
    }
}
export default AppRouter;