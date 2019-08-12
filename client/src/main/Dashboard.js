import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import TripForm from '../components/TripForm';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../styles/Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: 0,
            addModalShow: false
        }
    }


    // {this.props.loggedInStatus}

    render() {

        let addModalClose = () => {
            this.setState({
                addModalShow: false
            })
        }

        return (
            <div className="dashboard">
                <Navbar />
                <div className="top-wrapper">
                    <div className="profile-wrapper">
                        <div className="dash-profile-picture-container">
                            <div className="dash-profile-picture"></div>
                        </div>
                        <div className="dash-user-info-wrapper">
                            <div className="dash-user-info">
                                <p>{this.props.user.name}</p>
                                <p>{this.props.user.email}</p>
                                <p>{this.props.loggedInStatus}</p>
                            </div>
                        </div>
                    </div>
                    <div className="friends-wrapper">

                    </div>
                </div>
                <div className="bottom-wrapper">
                    <div className="prev-trips-wrapper">
                        <ButtonToolbar>
                            <Button id="invite-button" variant='dark' onClick={() => { this.setState({ addModalShow: true }) }}>
                                Add a Trip
                            </Button>
                            <TripForm show={this.state.addModalShow} onHide={addModalClose} ></TripForm>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard