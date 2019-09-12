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
            day_id: 0,
            itin: [],
            actModalShow: false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

        if (!this.state.trip || !this.state.user) {
            this.props.history.push('/');
        }

        // need to pull trip data with axios
    }

    // gets day and sets day_id state to that day, pulls itin via that day
    handleDay = (data) => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days/${data}`)
            .then(res => {
                // console.log('show day res', res)
                this.setState({
                    day_id: res.data.day.id
                })
                // console.log('setstate', this.state.day_id)

                this.handleItin(res.data.day.id);
            })
    }

    handleItin = (data) => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days/${data}/items`)
            .then(res => {
                // console.log('handleItin res', res)
                this.setState({
                    itin: res.data.items
                })
            })
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
                <Navbar user={this.state.user}/>
                <div className="trip-wrapper">
                    <div className="trip-container">
                        <div className="trip-titlecard">
                            <div className="titlecard-info">
                                <div className="titlecard-title">{this.state.trip.title}</div>
                                <div className="titlecard-details">{moment(this.state.trip.start_date.toString()).format('Do MMM YYYY')} ~ {moment(this.state.trip.end_date.toString()).format('Do MMM YYYY')}</div>
                                <div className="titlecard-details">{this.state.trip.location}</div>
                                <div className="titlecard-users"></div>
                            </div>
                        </div>
                        <div className="trip-bottom">
                            <div className="trip-left">
                                <div className="days-container">
                                    <Days user={this.state.user} trip={this.state.trip} setDayid={this.setDayid}
                                        handleDay={this.handleDay} handleItin={this.handleItin}></Days>
                                </div>
                                <div className="itin-container">
                                    <div className="itin">
                                        <Itin user={this.state.user} trip={this.state.trip} day_id={this.state.day_id} itin={this.state.itin}
                                            handleItin={this.handleItin}></Itin>
                                    </div>
                                    <ButtonToolbar>
                                        <Button id="add-item-button" variant='dark' onClick={() => { this.setState({ actModalShow: true }) }}>
                                            Add Item
                                        </Button>
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
                                        <Map></Map>
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