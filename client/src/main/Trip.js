import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Days from '../components/Days';
import Itin from '../components/Itin';
import ActivityForm from '../components/ActivityForm';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../styles/Trip.css';
import axios from 'axios';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            trip: this.props.trip,
            day_id: 0,
            actModalShow: false
        }
    }

    componentDidMount() {

        if (!this.state.trip) {
            this.props.history.push('/');
        }

        // need to pull trip data with axios

    }

    handleDay = (data) => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days/${data}`)
            .then(res => {
                console.log('show day res', res)
                this.setState({
                    day_id: res.data.day.id
                })
                console.log('setstate', this.state.day_id)
            })
    }

    handleItin = (data) => {

    }

    render() {
        // console.log('trip user', this.state.user);
        // console.log('trip data', this.state.trip);

        let addModalClose = () => {
            this.setState({
                actModalShow: false
            })
        }

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
                                        <div className="add-item-container">
                                            <ButtonToolbar>
                                                <Button id="add-trip-button" variant='dark' onClick={() => { this.setState({ actModalShow: true }) }}>
                                                    Add ACT
                                                </Button>
                                                <ActivityForm show={this.state.actModalShow} onHide={addModalClose}
                                                user={this.state.user} trip={this.state.trip} day_id={this.state.day_id}
                                                ></ActivityForm>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="trip-right">
                                <div className="days-container">
                                    <Days user={this.state.user} trip={this.state.trip} setDayid={this.setDayid} handleDay={this.handleDay}></Days>
                                </div>
                                <div className="itin-container">
                                    <div className="itin">
                                        <Itin user={this.state.user} trip={this.state.trip} day_id={this.state.day_id}></Itin>
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