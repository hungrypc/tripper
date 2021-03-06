import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Days from '../components/Days';
import Itin from '../components/Itin';
import Map from '../components/Map';
import ActivityForm from '../components/ActivityForm';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../styles/Trip.css';
import axios from 'axios';
import moment from 'moment';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            trip: this.props.trip,
            day_id: null,
            itin: [],
            actModalShow: false
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('trip')) {
            this.props.history.push('/');
        } else {
            let current_trip = JSON.parse(localStorage.getItem('trip'))
            let current_user = JSON.parse(localStorage.getItem('user'))
            this.setState({
                user: current_user,
                trip: current_trip
            })
            console.log('setting trip w local storage', this.state)
        }
    }

    // gets day and sets day_id state to that day, pulls itin via that day
    handleDay = (data) => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days/${data}`)
            .then(res => {
                this.setState({
                    day_id: res.data.day.id
                })
                this.handleItin(res.data.day.id);
            })
    }

    handleItin = (data) => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days/${data}/items`)
            .then(res => {
                this.setState({
                    itin: res.data.items
                })
            })
    }

    showBtn() {
        if (this.state.day_id !== null) {
            return (
            <Button id="add-item-button" variant='dark' onClick={() => { this.setState({ actModalShow: true }) }}>
                Add Item
            </Button>
            )
        }
    }


    render() {

        let addModalClose = () => {
            this.setState({
                actModalShow: false
            })
        }

        return (
            <div className="Trip">
                <Navbar user={this.state.user} />
                <div className="trip-wrapper">
                    <div className="trip-container">
                        <div className="trip-titlecard">
                            <div className="titlecard-info">
                                <div className="titlecard-title">{this.state.trip.title}</div>
                                <div className="titlecard-details">{moment(this.state.trip.start_date).format('Do MMM YYYY')} ~ {moment(this.state.trip.end_date).format('Do MMM YYYY')}</div>
                                <div className="titlecard-details">{this.state.trip.location}</div>
                                <div className="titlecard-users"></div>
                            </div>
                        </div>
                        <div className="trip-bottom">
                            <div className="trip-left">
                                <div className="days-container">
                                    <Days user={this.state.user} trip={this.state.trip} day_id={this.state.day_id} setDayid={this.setDayid}
                                        handleDay={this.handleDay} handleItin={this.handleItin}></Days>
                                </div>
                                <div className="itin-container">
                                    <div className="itin">
                                        <Itin user={this.state.user} trip={this.state.trip} day_id={this.state.day_id} itin={this.state.itin}
                                            handleItin={this.handleItin}></Itin>
                                    </div>
                                    <ButtonToolbar>
                                        {this.showBtn()}
                                        <ActivityForm show={this.state.actModalShow} onHide={addModalClose}
                                            user={this.state.user} trip={this.state.trip} day_id={this.state.day_id}
                                            handleItin={this.handleItin}
                                        ></ActivityForm>
                                    </ButtonToolbar>
                                </div>
                            </div>

                            <div className="trip-right">
                                <div className="trip-right-container">
                                    <div className="map-container">
                                        <Map lat={this.state.trip.lat} lng={this.state.trip.lng}
                                            itin={this.state.itin} day_id={this.state.day_id}></Map>
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