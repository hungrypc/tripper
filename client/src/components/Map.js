import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staticCenter: {
                lat: Number(this.props.lat),
                lng: Number(this.props.lng)
            },
            center: {
                lat: Number(this.props.lat),
                lng: Number(this.props.lng)
            },
            itin: this.props.itin,
            markers: [],
            map: {},
            maps: {}
        }
        this.markers =[];
        this.mapReference = React.createRef();

    }

    componentWillReceiveProps(nextprops) {
        if (this.state.itin !== nextprops.itin) {
            this.setState({
                itin: nextprops.itin
            })
        }
    }

    findLatLng = (obj) => {
        console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
        console.log('markers', this.state.markers)
    }

    setMarkers = (map, maps) => {
        // const that = this;
        this.setState({
            map: map,
            maps: maps
        })
        for (let item of this.state.itin){
            this.state.markers.push(new this.state.maps.Marker({
                map: this.state.map,
                title: 'set',
                position: {lat: Number(item.lat), lng: Number(item.lng)}
            }))
        }

    }

    renderMarkers() {
        for (let item of this.state.itin){
            this.state.markers.push(new this.state.maps.Marker({
                map: this.state.map,
                title: 'render',
                position: {lat: Number(item.lat), lng: Number(item.lng)}
            }))
        }
    }


    render() {

        if(this.state.maps.Marker){
            this.renderMarkers()
        }

        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCElThC6F3OHNpkBBWu-6fHLzH9GT-p1A4' }}
                    defaultCenter={ this.state.staticCenter }
                    center={this.state.center}
                    defaultZoom={12}
                    onClick={this.findLatLng}                
                    onGoogleApiLoaded={({map, maps}) => this.setMarkers(map, maps)}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
                </GoogleMapReact>
            </div>
        )
    }
}

export default Map
