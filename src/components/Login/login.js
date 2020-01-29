import React, { Component } from 'react';
import { connect } from 'react-redux';
import userIcon from '../../Images/user_icon.png'
import '../Login/login.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { validateLogin, fetchUserById, fetchEmployees } from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import bizxpLogo from '../../Images/bizxp_logo.png'
import loginBg from "../../Images/login_bg.png";
import Axios from 'axios';
import { API_FOR_PROD } from '../../conString';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            username: '',
            password: '',
            user: {}
        }
        this.ValidateLogin = this.ValidateLogin.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log("outside check",this.props.user.id);
        if (this.props.user.id && this.props.user.id != '0') {
            console.log(this.props.user);
            this.props.loginSuccess();
        }
    }
    render() {        
        return (
            <div className="login-card" style={{ backgroundImage: loginBg }}>
                <img style={{ width: '80%' }} src={bizxpLogo}></img>
                <img className="user-logo" src={userIcon}></img><br />
                <input type="text" name="username" placeholder="Username" onChange={(e) => this.onChange(e)} />
                <input type="password" name="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
                <button onClick={() => this.ValidateLogin()} className="login login-submit">
                    <div style={{display: this.state.loginState == 'fetching' ? '' : 'none', height: '1rem', width: '1rem'}} class="spinner-border"></div>
                    <label style={{display: this.state.loginState == 'fetching' ? 'none' : '', margin: '0'}}>Log In</label>
                </button>
            </div>
        )
    }

    async ValidateLogin() {
        this.setState({
            loginState: 'fetching'
        })
        const response = await Axios.get( API_FOR_PROD + '/userdetails/getuser?email=admin&pass=admin')
        if(response.data.user_Id > 0){
            this.setState({
                loginState: 'success'
            })
            this.props.loginSuccess();
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
}


const mapStateToProps = state => ({
    employees: state.loginReducer.employees, isSuccess: state.loginReducer.isSuccess, user: state.loginReducer.user

})
export default connect(mapStateToProps, { validateLogin, fetchUserById, fetchEmployees })(Login);