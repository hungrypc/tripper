import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import axios from 'axios';

class Itin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            trip: this.props.trip,
            day_id: this.props.day_id,
            itin: []
        }
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days/${this.state.day_id}/items`)
            .then(res => {
                console.log('get items res', res)
                this.setState({
                    itin: res.data.items
                })
            })
    }


    //  rewrite this to handle more errors, slightly sloppy
    defaultDay = () => {
        if (this.state.day_id === 0) {
            return "Please add a day."
        } else {
            return "Please add to the Itinerary."
        }
    }

    render() {


        return (
            <div className="Itin">
                {this.defaultDay()}
            </div>
        )
    }
}

export default Itin;