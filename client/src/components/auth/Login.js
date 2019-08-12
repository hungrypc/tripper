import React, { Component } from 'react';
import axios from 'axios';
// import '../tripcard/styles/Login.css'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            email: "",
            password: "",
            loginErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const {
            email,
            password
        } = this.state;

        axios.post("http://localhost:3001/sessions", {
            user: {
                email: email,
                password: password
            }
        },
            // { withCredentials: true }
        ).then(res => {
            console.log('logged in?', res)
            if (res.data.logged_in) {
                this.props.login(res.data);
                // this.props.cookies.set('user_id', res.data.user.id)
                this.props.handleSuccessfulAuth(res.data)
            }
        }).catch(error => {
            console.log('registration errors', error);
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="login-form">
                <div className="container">
                    <div className="input-group mb-3">
                        <form onSubmit={this.handleSubmit}>
                            <input className="form-control" id="email" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                            <br></br>
                            <input className="form-control" id="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            <label htmlFor="remember" className="pure-checkbox">
                                <input id="remember" type="checkbox" /> Remember me
                            </label>
                            <br></br>
                            <button type="submit" className="btn btn-dark">Login</button>
                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

export default Login;
