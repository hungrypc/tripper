import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ActivityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
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
            category: this.state.type
        });

        this.props.onHide();
        // console.log('before post state', this.state)
        // console.log('before post props', this.props)

        axios.post(`http://localhost:3001/users/${this.props.user.id}/trips/${this.props.trip.id}/days/${this.props.day_id}/items`,
            {                
                title: this.state.title,
                description: this.state.description,
                category: 'activity',
                day_id: this.props.day_id
            })
            .then((res) => {
                // console.log('post item res', res)
                this.setState({
                    title: '',
                    description: ''
                })
                this.props.handleItin(this.props.day_id)
            })

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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