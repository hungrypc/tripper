import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Days from '../components/Days';
import '../styles/Trip.css';
import axios from 'axios';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null,
            user: this.props.user,
            trip: this.props.trip,
            day_id: 0
        }
    }

    componentDidMount() {

        if (!this.state.trip) {
            this.props.history.push('/');
        }

        // need to pull trip data with axios

        // USE THIS TO GET DAYS

    }

    addDay = () => {
        axios.post(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days`)
            .then(res => {
                console.log('day post res', res)
                this.setState({
                    day_id: res.data.day.id                    
                })
                console.log(this.state.day_id)
            })
    }

    setDayid = (data) => {
        this.setState({
            day_id: data.day.id            
        })
        console.log('day id', this.state.day_id)
    }

    render() {
        // console.log('trip user', this.state.user);
        // console.log('trip data', this.state.trip);

        return (
            <div className="Trip">
                <Navbar />
                <div className="trip-wrapper">
                    <div className="trip-container">
                        <div className="trip-titlecard">
                            <div className="titlecard-info">
                                <div className="titlecard-title">{this.state.trip.title}</div>
                                <div className="titlecard-users"></div>
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
                                    <Days user={this.state.user} trip={this.state.trip} setDayid={this.setDayid}></Days>
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