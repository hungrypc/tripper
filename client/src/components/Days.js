import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Days extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            trip: this.props.trip,
            days: [],
        }
    }

    componentDidMount() {
        this.getDays();
    }

    getDays = () => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days`)
            .then(res => {
                console.log('get days response', res);
                this.setState({
                    days: res.data.days
                })
            })
    }

    addDay = () => {
        axios.post(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days`)
            .then(res => {
                console.log('day post res', res)
                this.props.handleDay(res.data.day.id)
                this.getDays()
            })
    }

    render() {

        return (
            <div className="Days">
                {this.state.days.map(day => (
                    <div key={day.id} className="day-block" onClick={() => {this.props.handleDay(day.id)}}>DAY</div>
                ))}
                <Button id="add-day" variant="dark" onClick={() => { this.addDay() }}>ADD DAY</Button>
            </div>
        )
    }
}

export default Days;