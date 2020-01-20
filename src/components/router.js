import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import App from '../App';

class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalClients: 0,
            clients: [
                {
                    clientName: 'Aousaf Rashid',
                    phone: '01611416466',
                    email: 'nabilrashid44@gmail.com',
                    address: '11/B, Khilgaon, Dhaka',
                    totalOrders: '115'
                }
            ]
        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/home" component={App} />
                    <Route exact path="/login" component={App}/>
                </Switch>
            </Router>
        )
    }
}
export default AppRouter;