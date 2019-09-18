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
            day_id: this.props.day_id,
            markers: [],
            map: {},
            maps: {}
        }
        this.mapReference = React.createRef();

    }

    componentWillReceiveProps(nextprops) {
        // if new day selected, clears prev markers
        if (this.state.day_id !== nextprops.day_id) {
            this.state.markers.forEach(function (marker) {
                marker.setMap(null);
            });
            this.deleteMarkers();
        }
        if (this.state.itin !== nextprops.itin) {
            this.setState({
                itin: nextprops.itin
            })
        }
    }

    deleteMarkers = () => {
        this.setState({
            markers: []
        })
    }

    findLatLng = (obj) => {
        console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
        console.log('markers', this.state.markers)
    }

    setMarkers = (map, maps) => {

        this.setState({
            map: map,
            maps: maps
        })
        for (let item of this.state.itin) {
            this.state.markers.push(new this.state.maps.Marker({
                map: this.state.map,
                title: 'set',
                position: { lat: Number(item.lat), lng: Number(item.lng) }
            }))
        }

    }

    renderMarkers() {
        for (let item of this.state.itin) {
            let infowindow = new this.state.maps.InfoWindow({
                content: item.title
              });

            let newMarker = new this.state.maps.Marker({
                map: this.state.map,
                title: item.title,
                animation: this.state.maps.Animation.DROP,
                position: { lat: Number(item.lat), lng: Number(item.lng) }
            })
            newMarker.addListener('click', function() {
                infowindow.open(window.google.map, newMarker);
            });

            this.state.markers.push(newMarker)
            
        }
    }


    render() {

        if (this.state.maps.Marker) {
            this.renderMarkers()
        }

        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCElThC6F3OHNpkBBWu-6fHLzH9GT-p1A4' }}
                    defaultCenter={this.state.staticCenter}
                    center={this.state.center}
                    defaultZoom={13}
                    onClick={this.findLatLng}
                    onGoogleApiLoaded={({ map, maps }) => this.setMarkers(map, maps)}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
                </GoogleMapReact>
            </div>
        )
    }
}

export default Map
