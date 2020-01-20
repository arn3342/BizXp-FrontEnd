import React, { Component } from 'react';
import loginBg from '../../Images/bg_login.jpg'
import '../Login/login.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div class="login-card">
                <h1>Log-in</h1><br />
                <input type="text" name="username" placeholder="Username" onChange={(e) => this.onChange(e)} />
                <input type="password" name="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
                <button onClick={() => this.ValidateLogin()} class="login login-submit">Log In</button>
            </div>
        )
    }
    ValidateLogin() {
        if (this.state.username == 'admin' && this.state.password == 'admin') {
            this.props.loginSuccess();
            console.log('called new')
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
}
export default Login;