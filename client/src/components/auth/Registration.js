import React, { Component } from 'react';
import axios from 'axios';
// import '../tripcard/styles/Login.css'


class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            name: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const {
            email,
            name,
            password,
            password_confirmation
        } = this.state;

        axios.post("http://localhost:3001/registrations", {
            user: {
                email: email,
                name: name,
                password: password,
                password_confirmation: password_confirmation
            }
        },
            // { withCredentials: true }
        ).then(res => {
            console.log('register res', res)
            if (res.data.status === 'created') {
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
            <div className="register-form">
                <div className="container">
                    <div className="input-group mb-3">
                        <form onSubmit={this.handleSubmit}>
                            <input className="form-control" type="email" name="email" placeholder="Email" autoComplete="off" value={this.state.email} onChange={this.handleChange} required />
                            <br></br>
                            <input className="form-control" type="text" name="name" placeholder="Name" autoComplete="off" value={this.state.name} onChange={this.handleChange} required />
                            <br></br>
                            <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            <br></br>
                            <input className="form-control" type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                            <label htmlFor="remember" className="pure-checkbox">
                                <input id="remember" type="checkbox" /> Remember me
                            </label>
                            <br></br>
                            <button type="submit" className="btn btn-dark">Register</button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Registration;
