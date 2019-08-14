import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Trip.css';
// import axios from 'axios';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null,
            user: this.props.user,
            trip: this.props.trip
        }
    }

    componentDidMount() {

        // USE THIS TO GET TRIP ITEMS

        // axios.get(`http://localhost:3001/users/${this.state.user.id}trips/${this.state.trip.id}`)
        //     .then(res => {

        //     })
    }

    render() {
        console.log('trip user', this.state.user);
        console.log('trip data', this.state.trip);

        return (
            <div className="Trip">
                <Navbar />
                <div className="trip-wrapper">
                    <div className="trip-container">
                        <div className="trip-titlecard">
                            <div className="titlecard-info">
                                <div className="titlecard-title">{this.state.trip.title}</div>
                                <div className="titlacard-users"></div>
                            </div>
                        </div>
                        <div className="trip-bottom">
                            <div className="trip-left">
                                <div className="trip-left-container">
                                    <div className="map-container">

                                    </div>
                                    <div className="trip-info-container">
                                        <div className="trip-info">
                                            <div className="trip-info-data">location: {this.state.trip.location}</div>
                                            <div className="trip-info-data">start: {this.state.trip.start_date}</div>
                                            <div className="trip-info-data">end: {this.state.trip.end_date}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="trip-right">
                                <div className="days-container">

                                </div>
                                <div className="itin-container">
                                    <div className="itin">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trip;