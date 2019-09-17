import React, { Component } from 'react';
import axios from 'axios';

class Days extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            trip: this.props.trip,
            day_id: this.props.day_id,
            days: [],
        }
    }

    componentDidMount() {
        this.getDays();
    }

    componentWillReceiveProps(nextprops) {
        if (this.state.day_id !== nextprops.day_id) {
            this.setState({
                day_id: nextprops.day_id
            })
        }
    }

    getDays = () => {
        axios.get(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days`)
            .then(res => {
                // console.log('get days response', res);
                this.setState({
                    days: res.data.days
                })
            })
    }

    addDay = () => {
        axios.post(`http://localhost:3001/users/${this.state.user.id}/trips/${this.state.trip.id}/days`)
            .then(res => {
                // console.log('day post res', res)
                this.props.handleDay(res.data.day.id)
                this.getDays()
            })
    }


    render() {

        return (
            <div className="Days">
                {this.state.days.map((day, i) => (
                    <div key={day.id} className={this.state.day_id === day.id ? 'activeDay' : 'day-block'} onClick={() => {this.props.handleDay(day.id)}}>DAY {i + 1}</div>
                ))}
                <div id="add-day" className="day-block-plus" onClick={() => { this.addDay() }}>+</div>
            </div>
        )
    }
}

export default Days;