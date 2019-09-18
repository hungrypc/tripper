import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import TripForm from '../components/TripForm';
import FriendForm from '../components/FriendsForm';
import { Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            addModalShow: false,
            friendModalShow: false,
            trips: []
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('user')) {
            this.props.history.push('/');
        } else {
            let current_user = JSON.parse(localStorage.getItem('user'))
        this.setState({
            user: current_user
        })
        console.log('local storage get item user state', this.state)
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips`)
            .then(res => {
                this.setState({
                    trips: res.data.trips
                })
            })
    }

    clickTrip = (trip) => {
        this.props.setTrip(trip)
        this.props.history.push(`/users/${this.state.user.id}/trips/${trip.id}`)
    }


    render() {
        let addModalClose = () => {
            this.setState({
                addModalShow: false
            })
        }

        let friendModalClose = () => {
            this.setState({
                friendModalShow: false
            })
        }

        return (
            <div className="dashboard">
                <Navbar user={this.state.user} />
                <div className="top-wrapper">
                    <div className="profile-wrapper">
                        <div className="dash-profile-picture-container">
                            <div className="dash-profile-picture"></div>
                        </div>
                        <div className="dash-user-info-wrapper">
                            <div className="dash-user-info">
                                <p>{this.state.user.name}</p>
                                <p>{this.state.user.email}</p>
                                <p>{this.state.loggedInStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="friends-wrapper">
                        <div className="friends-box"></div>
                        <ButtonToolbar>
                            <Button id="add-friend-button" variant='dark' onClick={() => { this.setState({ friendModalShow: true }) }}>
                                Add Friend
                            </Button>
                            <FriendForm show={this.state.friendModalShow} onHide={friendModalClose}
                                user={this.state.user}
                            ></FriendForm>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="bottom-wrapper">
                    <div className="prev-trips-wrapper">
                        {this.state.trips.map(trip => (
                            <div className="trip-block" key={trip.id}>
                                <div className="trip-block-img"></div>
                                <div className="trip-block-title">{trip.title}</div>
                                <div>{trip.location}</div>
                                <div id="goto-trip"
                                    onClick={() => { this.clickTrip(trip) }}
                                > View </div>
                            </div>
                        ))}
                        <ButtonToolbar>
                            <Button id="add-trip-button" variant='dark' onClick={() => { this.setState({ addModalShow: true }) }}>
                                Add a Trip
                            </Button>
                            <TripForm show={this.state.addModalShow} onHide={addModalClose}
                                user={this.state.user} handleTrip={this.props.handleTrip}
                            ></TripForm>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard