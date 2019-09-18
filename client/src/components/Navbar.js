import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    handleLogout() {
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/dashboard">wander</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {!this.state.user && (
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link" href="/Login">Login</a>
                            <a className="nav-item nav-link" href="/Register">Signup</a>
                        </div>
                    )}
                    {this.state.user && (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                {/* eslint-disable-next-line */}
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.user.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="/" onClick={() => {this.handleLogout()}}>Log Out</a>
                                </div>
                            </li>
                        </div>
                    )}
                </div>
            </nav>
        )
    }
}

export default Navbar