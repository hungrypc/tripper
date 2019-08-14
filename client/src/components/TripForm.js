import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
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
            id: this.props.user.id,
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            title: this.state.title,
            location: this.state.location,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            user_id: this.state.id
        });
        // console.log(this.state)
        axios.post(`http://localhost:3000/users/${this.state.id}/trips`,
        // axios.post(`http://localhost:3000/trips`,
            {
                // user_id: this.props.cookies.get('user_id'),
                title: this.state.title,
                location: this.state.location,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                user_id: this.state.id
            })
            .then((response) => {
                // this.props.setTrip(response.data.id)
                // console.log('tripform res data', response.data.id)
                // this.setState({
                //     id: response.data.id,
                //     submit: true
                // })

                // this.props.setTrip(response.data.id);
                // console.log('tripform state after post', this.state)
                // window.location.href = `/trips/${response.data.id}`
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



    render() {
        // console.log(this.state)
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
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
                                <input className="form-control" type="text" name="location" placeholder="Where To?" autoComplete="off" value={this.state.location} onChange={this.handleChange} required />
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

export default TripForm