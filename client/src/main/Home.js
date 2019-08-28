import React, { Component } from 'react';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login'
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import '../styles/Home.css';

class Home extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props)
        this.state = {
            user: 0,
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }


    handleSuccessfulAuth(data) {
        this.props.handleLogin(data)
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div className="Home">
                <HashRouter>
                    <div className="header">
                        <div className="nav-link"><NavLink to="/Login">Login</NavLink></div>
                        |
                        <div className="nav-link"><NavLink to="/Register">Register</NavLink></div>
                    </div>
                    <div className="content">
                        <Route path="/Login"
                            render={(props) => <Login {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} login={this.props.handleLogin} />} />
                        <Route path="/Register"
                            render={(props) => <Registration {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} />} />
                    </div>
                </HashRouter>
            </div>

        );
    }
}

export default Home;