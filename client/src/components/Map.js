import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import '../../map-location-search.js';


// const google = window.google;
// const AnyReactComponent = () => <i className="fas fa-map-pin"></i>

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staticCenter: {
                lat: parseFloat(this.props.lat),
                lng: parseFloat(this.props.lng)
            },
            center: {
                lat: parseFloat(this.props.lat),
                lng: parseFloat(this.props.lng)
            },
            markers: [],
            map: {},
            maps: {}
        }
        // this.markers =[];
        // this.reference = React.createRef();
        // this.mapReference = React.createRef();
        // this.changeCenter = this.changeCenter.bind(this);

    }
    componentDidMount() {
        // this.initAutocomplete(this.props.id);
        //this.initAutocomplete(this.reference);
    }

    addMarker = (obj) => {
        console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
        this.setState({
            markers: [
                {
                    lat: obj.lat,
                    lng: obj.lng
                }
            ]
        })
        console.log('markers', this.state.markers)
    }

    // changeCenter = (lat, lng) => {
    //     this.setState({
    //         center: {
    //             lat: lat,
    //             lng: lng
    //         }
    //     })
    // }


    // initAutocomplete = (ref) => {

    //     var map = this.state.map
        
        
    //     var searchBox = new google.maps.places.SearchBox(ref.current);

        
    //     map.addListener('bounds_changed', function () {
    //         searchBox.setBounds(map.getBounds());

    //     });
    //     const that = this;

    //     var markers = this.markers;
        
        
    //     searchBox.addListener('places_changed', function () {
    //         var places = searchBox.getPlaces();

    //         if (places.length === 0) {
    //             return;
    //         }

    //         // Clear out the old markers.
    //         markers.forEach(function (marker) {
    //             console.log('markers', markers)
    //             if(marker.title === "search") {
    //                 marker.setMap(null);
    //             }
                
    //         });

    //         // For each place, get the icon, name and location.
    //         var bounds = new google.maps.LatLngBounds();
    //         places.forEach(function (place) {
    //             if (!place.geometry) {
    //                 console.log("Returned place contains no geometry");
    //                 return;
    //             }
    //             var icon = {
    //                 url: place.icon,
    //                 size: new google.maps.Size(71, 71),
    //                 origin: new google.maps.Point(0, 0),
    //                 anchor: new google.maps.Point(17, 34),
    //                 scaledSize: new google.maps.Size(25, 25)
    //             };
                

    //             // Create a marker for each place.
    //             markers.push(new that.state.maps.Marker({
    //                 map: map,
    //                 icon: icon,
    //                 title: 'search',
    //                 position: place.geometry.location
    //             }));
                
    //             that.changeCenter(place.geometry.location.lat(), place.geometry.location.lng())
    //             that.props.setLatLng(place.geometry.location.lat(), place.geometry.location.lng())

    //             if (place.geometry.viewport) {
    //                 // Only geocodes have viewport.
    //                 bounds.union(place.geometry.viewport);
    //             } else {
    //                 bounds.extend(place.geometry.location);
    //             }
    //         });
    //     });
    // }

    // setMarkers = (map, maps) => {
    //     // const that = this;
    //     this.setState({
    //         map: map,
    //         maps: maps
    //     })
    //     for (let activity of this.props.activities){
    //         this.state.markers.push(new this.state.maps.Marker({
    //             map: this.state.map,
    //             title: 'test',
    //             position: {lat: Number(activity.lat), lng: Number(activity.long)}
    //         }))
    //     }
    //     this.initAutocomplete(this.reference);
    // }

    // renderMarkers() {
    //     for (let activity of this.props.activities){
    //         this.state.markers.push(new this.state.maps.Marker({
    //             map: this.state.map,
    //             title: 'test',
    //             position: {lat: Number(activity.lat), lng: Number(activity.long)}
    //         }))
    //     }
    // }


    render() {

        // if (this.state.map.addListener && this.props.selected_ref) {
        //     // console.log('if in render')
        //     this.initAutocomplete(this.props.selected_ref);
        // } else {
        //     // console.log('if else', this.props.selected_ref)
        // }
        // if(this.state.maps.Marker){
        //     this.renderMarkers()
        // }
        return (
            <div className="map">
                {/* <input ref={this.reference} id="searchBox" key="map-key"></input> */}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCElThC6F3OHNpkBBWu-6fHLzH9GT-p1A4' }}
                    defaultCenter={ this.state.staticCenter }
                    center={this.state.center}
                    defaultZoom={12}
                    onClick={this.addMarker}
                    // onTilesLoaded={({map, maps}) => this.setMarkers(map, maps)}
                    // onGoogleApiLoaded={({map, maps}) => this.setMarkers(map, maps)}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
                    {/* <AnyReactComponent
                        lat={37.566535}
                        lng={126.9779692}
                    /> */}
                </GoogleMapReact>

            </div>
        )
    }
}

export default Map
