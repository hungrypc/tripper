import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './main/Home';
import Dashboard from './main/Dashboard';
import Trip from './main/Trip';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: 0,
      trip: 0
    }
  }

  checkLoginStatus() {
    if (this.state.loggedInStatus === 'LOGGED_IN') {
      console.log('logged in')
    }
    else {
      this.props.history.push('/login')
    }
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(res => {
        console.log('check login res', res)
        if (res.data.logged_in) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: res.data.user
          })
        }
        else if (!res.data.logged_in & this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      }).catch(error => {
        console.log('check login error', error);
      });
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    })
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  handleTrip = (data) => {
    this.setState({
      trip: data.trip
    })
    localStorage.setItem('trip', JSON.stringify(data.trip));
  }

  setTrip = (data) => {
    this.setState({
      trip: data
    })
    localStorage.setItem('trip', JSON.stringify(data));
  }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} render={props => (
              <Home {...props} handleLogin={this.handleLogin} />
            )} />
            <Route exact path={"/dashboard"} render={props => (
              <Dashboard {...props} user={this.state.user} 
              loggedInStatus={this.state.loggedInStatus} handleTrip={this.handleTrip}
              setTrip={this.setTrip} />
            )} />
            <Route exact path={"/users/:user_id/trips/:trip_id"} render={(props) => (
              <Trip {...props} user={this.state.user} trip={this.state.trip} />
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
