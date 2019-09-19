import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class FriendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hits: { name: "", email: "" },
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            email: this.state.email
        });
        // this.props.onHide();

        axios.post(`http://localhost:3001/users/`,
            {
                email: this.state.email
            })
            .then((res) => {
                console.log('post email res', res)
                this.setState({
                    email: '',
                    hits: res.data.users
                })
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    showPlus = () => {
        if(this.state.hits.name) {
            return (<i className="fas fa-plus"></i>)
        }
    }

    render() {

        return (
            <div>
                <Modal
                    {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Friend
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">
                            <form className="friend-form" onSubmit={this.handleSubmit}>
                                <input className="form-control friend-control" type="text" name="email" placeholder="Search by Email" autoComplete="off" value={this.state.email} onChange={this.handleChange} required />
                                <button type="submit" className="btn btn-dark">Search</button>
                                <br></br>
                                <br></br>
                                <div className="search-list">
                                    <div>
                                        <div className="hit-info">
                                            <div className="hit-name">{this.state.hits.name}</div>
                                            <div className="hit-email">{this.state.hits.email}</div>
                                        </div>
                                        <div className="hit-add">{this.showPlus()}</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default withRouter(FriendForm)