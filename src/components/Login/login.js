import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginBg from '../../Images/bg_login.jpg'
import '../Login/login.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { fetchEmoloyees } from '../../actions/loginActions';
import { bindActionCreators } from 'redux';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees:[],
            username: '',
            password: ''
        }
        this.ValidateLogin = this.ValidateLogin.bind(this);
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
            // this.props.loginSuccess();
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
    }
}

const mapStateToProps = state => ({
    employees: state.loginReducer.employees, isSuccess: state.loginReducer.isSuccess
})
// function mapDispatchToProps(dispatch){
//     return{ 
//         fetchEmoloyees: bindActionCreators(fetchEmoloyees, dispatch)
//     };
// }
// export default Login;
export default connect(mapStateToProps, {fetchEmoloyees})(Login);