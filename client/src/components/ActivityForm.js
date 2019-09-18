import React, { Component } from 'react';
import ItemLocationSearch from '../components/ItemLocationSearch';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ActivityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            lat: 0,
            lng: 0,
            category: 'activity',
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            title: this.state.title,
            description: this.state.description,
            category: this.state.type,
            lat: this.state.lat,
            lng: this.state.lng
        });
        this.props.onHide();

        axios.post(`http://localhost:3001/users/${this.props.user.id}/trips/${this.props.trip.id}/days/${this.props.day_id}/items`,
            {
                title: this.state.title,
                description: this.state.description,
                category: this.state.category,
                day_id: this.props.day_id,
                lat: this.state.lat,
                lng: this.state.lng
            })
            .then((res) => {
                console.log('post item res', res)
                this.setState({
                    title: '',
                    description: '',
                    category: 'activity',
                    lat: 0,
                    lng: 0
                })
                this.props.handleItin(this.props.day_id)
            })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleItemLatLng = (lat, lng) => {
        this.setState({
            lat,
            lng
        })
    }


    render() {

        return (
            <div>
                <Modal
                    {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add an Activity
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">
                            <form className="trip-form" onSubmit={this.handleSubmit}>
                                <input className="form-control" type="text" name="title" placeholder="Title" autoComplete="off" value={this.state.title} onChange={this.handleChange} required />
                                <br></br>
                                <input className="form-control" type="text" name="description" placeholder="Description" autoComplete="off" value={this.state.description} onChange={this.handleChange} required />
                                <br></br>
                                <ItemLocationSearch handleItemLatLng={this.handleItemLatLng}></ItemLocationSearch>
                                <br></br>
                                <select className="form-control" id="exampleFormControlSelect1" value={this.state.category} name="category" onChange={this.handleChange}>
                                    <option value="activity">Activity</option>
                                    <option value="transport">Transport</option>
                                    <option value="accomodation">Accomodation</option>
                                </select>
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

export default withRouter(ActivityForm)