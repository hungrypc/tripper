import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import axios from 'axios';

class Itin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itin: this.props.itin
        }
    }

    componentWillReceiveProps(nextprops) {
        if (this.state.itin !== nextprops.itin) {
            this.setState({
                itin: nextprops.itin
            })
        }
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
        // console.log('itin state', this.state)

        return (
            <div className="Itin-main">
                {this.state.itin.map(item => (
                    <div key={item.id} className="item-block">
                        <div className="item-block-icon"><i className="fas fa-map-marked-alt"></i></div>
                        <div className="item-block-info">
                            <div className="item-block-title">{item.title}</div>
                            <div className="item-block-desc">{item.description}</div>
                        </div>                        
                    </div>
                ))}
            </div>
        )
    }
}

export default Itin;