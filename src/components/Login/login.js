import React, { Component } from 'react';
import { connect } from 'react-redux';
import userIcon from '../../Images/user_icon.png'
import '../Login/login.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { validateLogin, fetchUserById, fetchEmployees } from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import bizxpLogo from '../../Images/bizxp_logo.png'
import loginBg from "../../Images/login_bg.png";

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
<<<<<<< HEAD
    render() {
        return (
            <div className="login-card" style={{backgroundImage: loginBg}}>
                <img style={{width: '80%'}} src={bizxpLogo}></img>
                <br />
                <img className="user-logo" src={userIcon}></img><br />
                <input type="text" name="username" placeholder="Username" onChange={(e) => this.onChange(e)} />
                <input type="password" name="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
                <button onClick={() => this.ValidateLogin()} className="login login-submit">Log In</button>
            </div>
        )
    }
    ValidateLogin() {
        if (this.state.username == 'admin' && this.state.password == 'admin') {
            this.props.loginSuccess();
            console.log('data comes here', this.props.isSuccess)
        }
    }
    componentDidMount() {
        this.props.fetchEmoloyees();
    }
    onChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
=======

componentDidUpdate(prevProps){
    if(this.props.user.id){
        this.props.loginSuccess();
>>>>>>> fa980e97b8ca6e5eeb36bece13ab3ffe58068f15
    }
}
render() {
    return (
        <div  className="login-card" style={{ backgroundImage: loginBg }}>
            <img style={{ width: '80%' }} src={bizxpLogo}></img>
            <img className="user-logo" src={userIcon}></img><br />
            <input type="text" name="username" placeholder="Username" onChange={(e) => this.onChange(e)} />
            <input type="password" name="password" placeholder="Password" onChange={(e) => this.onChange(e)} />
            <button onClick={() => this.ValidateLogin()} className="login login-submit">Log In</button>
        </div>
    )
}

ValidateLogin() {
    this.props.fetchUserById(1);
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
// function mapDispatchToProps(dispatch){
//     return{ 
//         validateLogin: bindActionCreators(validateLogin, dispatch)
//     };
// }
// export default Login;
export default connect(mapStateToProps, { validateLogin, fetchUserById, fetchEmployees })(Login);