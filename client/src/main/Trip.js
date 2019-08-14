import React, { Component } from 'react';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null,
            user: this.props.user
        }
    }

    componentWillMount() {
        
    }

    render() {

        return (  
            <div className="Trip">
                <h1>TRIP PAGE</h1>
            </div>
        )
    }
}

export default Trip;