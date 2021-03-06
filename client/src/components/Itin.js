import React, { Component } from 'react';
import axios from 'axios';


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

    handleIcon(category) {
        if (category === "activity") {
            return (<i className="fas fa-map-marked-alt"></i>)
        } else if (category === "transport") {
            return (<i className="fas fa-bus-alt"></i>)
        } else if (category === "accomodation") {
            return (<i className="fas fa-hotel"></i>)
        }
    }

    handleDelete(id) {
        axios.delete(`http://localhost:3001/users/${this.props.user.id}/trips/${this.props.trip.id}/days/${this.props.day_id}/items/${id}`)
            .then(res => {
                this.props.handleItin(this.props.day_id);
                console.log(res)
            })
    }

    render() {
        return (
            <div className="Itin-main">
                {this.state.itin.map(item => (
                    <div key={item.id} className="item-block">
                        <div className="item-block-icon"></div>
                        <div className="item-block-info">
                            <span className="line">
                                <span className="icon-circle">{this.handleIcon(item.category)}</span>
                            </span>
                            <div className="item-block-title">{item.title}</div>
                            <div className="item-block-delete"><i className="far fa-trash-alt" onClick={() => { this.handleDelete(item.id) }}></i></div>
                            <div className="item-block-desc">{item.description}</div>
                        </div>                        
                    </div>
                ))}
            </div>
        )
    }
}

export default Itin;