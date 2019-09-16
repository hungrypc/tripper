import React, { Component } from 'react';
import LocationSearch from '../components/LocationSearch';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import "../../node_modules/react-datetime/css/react-datetime.css";

const axios = require('axios')
const DateTime = require('react-datetime');

let yesterday = DateTime.moment().subtract(1, 'day');
let valid = function (current) {
    return current.isAfter(yesterday);
};

class TripForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            start_date: '',
            end_date: '',
            lat: 0,
            lng: 0,
            id: this.props.user.id,
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }


    handleSubmit = (event) => {
        // console.log('this', this);

        event.preventDefault();
        
        this.setState({
            title: this.state.title,
            location: this.state.location,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            user_id: this.state.id,
            lat: this.state.lat,
            lng: this.state.lng
        });
        console.log('tripform submit state', this.state)
        
        axios.post(`http://localhost:3000/users/${this.state.id}/trips`,
            {
                // user_id: this.props.cookies.get('user_id'),
                title: this.state.title,
                location: this.state.location,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                user_id: this.state.id,
                lat: this.state.lat,
                lng: this.state.lng
            })
            .then((response) => {
                console.log('tripform res data', response.data)

                this.props.handleTrip(response.data);
                this.props.history.push(`/users/${this.state.id}/trips/${response.data.trip.id}`);

            })
        // return this.setState({ error: '' });
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleStartDateChange(event) {
        this.setState({
            start_date: event._d,
        });
    };

    handleEndDateChange(event) {
        this.setState({
            end_date: event._d,
        });
    };

    handleLocationChange = (location) => {
        this.setState({
            location: location
        })
    }

    handleLatLng = (lat, lng) => {
        console.log('handle latlng', lat, lng)
        this.setState({
            lat: lat,
            lng: lng
        })
    }


    render() {


        return (
            <div>
                <Modal
                    {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add a Trip
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">
                            <form className="trip-form" onSubmit={this.handleSubmit}>
                                <input className="form-control" type="text" name="title" placeholder="Title" autoComplete="off" value={this.state.title} onChange={this.handleChange} required />
                                <br></br>
                                {/* <input className="form-control" type="text" name="location" placeholder="Where To?" autoComplete="off" value={this.state.location} onChange={this.handleChange} required />
                                <br></br> */}
                                <LocationSearch handleLocationChange={this.handleLocationChange} handleLatLng={this.handleLatLng}></LocationSearch>
                                <br></br>
                                <DateTime inputProps={{
                                    className: 'form-control',
                                    placeholder: "Start Date"
                                }}
                                    autoComplete="off"
                                    timeFormat={false}
                                    value={this.state.start_date} name="start_date"
                                    onChange={this.handleStartDateChange} isValidDate={valid}
                                    required
                                />
                                <br></br>
                                <DateTime inputProps={{
                                    className: 'form-control',
                                    placeholder: "End Date"
                                }}
                                    autoComplete="off"
                                    timeFormat={false}
                                    value={this.state.end_date} name="end_date"
                                    onChange={this.handleEndDateChange} isValidDate={valid}
                                    required
                                />
                                <br></br>
                                <button type="submit" className="btn btn-dark">Continue</button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default withRouter(TripForm)