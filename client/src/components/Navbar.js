import React from 'react';

const Navbar = props => {

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">wander</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="/Login">Login</a>
                    <a className="nav-item nav-link" href="/Register">Signup</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar