import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import TripForm from '../components/TripForm';
import { Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            addModalShow: false,
            trips: []
        }
    }

    componentDidMount() {
        if (!this.state.user) {
            this.props.history.push('/');
        }

        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips`)
            .then(res => {
                console.log('get trips index response', res);
                this.setState({
                    trips: res.data.trips
                })
                console.log('dash trip state', this.state.trips)
            })
    }


    render() {

        // console.log("dashboard user state", this.state.user)

        let addModalClose = () => {
            this.setState({
                addModalShow: false
            })
        }

        return (
            <div className="dashboard">
                <Navbar />
                <div className="top-wrapper">
                    <div className="profile-wrapper">
                        <div className="dash-profile-picture-container">
                            <div className="dash-profile-picture"></div>
                        </div>
                        <div className="dash-user-info-wrapper">
                            <div className="dash-user-info">
                                <p>{this.props.user.name}</p>
                                <p>{this.props.user.email}</p>
                                <p>{this.props.loggedInStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="friends-wrapper">
                        <ButtonToolbar>
                            <Button id="invite-button" variant='dark' onClick={() => { this.setState({ addModalShow: true }) }}>
                                Add a Trip
                            </Button>
                            <TripForm show={this.state.addModalShow} onHide={addModalClose}
                                user={this.state.user} handleTrip={this.props.handleTrip}
                            ></TripForm>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="bottom-wrapper">
                    <div className="prev-trips-wrapper">
                        {this.state.trips.map( trip => (
                            <div className="trip-block" key={trip.id}>
                                {trip.title}
                                {trip.location}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard