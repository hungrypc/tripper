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
        // this.props.handleItin();
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
    // defaultDay = () => {
    //     if (this.state.day_id === 0) {
    //         return "Please add a day."
    //     } else {
    //         return "Please add to the Itinerary."
    //     }
    // }

    render() {
        console.log('itin state', this.state)

        return (
            <div className="Itin-main">
                {this.state.itin.map(item => (
                    <div key={item.id} className="item-block">
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Itin;