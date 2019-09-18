import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class ItemLocationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            lat: 0,
            lng: 0
        };
    }

    handleChange = address => {
        this.setState({ address });
        // console.log('location change address', this.state.address)
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState({
                    lat: latLng.lat,
                    lng: latLng.lng
                })
                this.props.handleItemLatLng(this.state.lat, this.state.lng)
            })
            .catch(error => console.error('Error', error));
    };

    render() {

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="suggestion-container">
                        <input 
                            {...getInputProps({
                                placeholder: 'Address',
                                className: 'location-search-input form-control',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div className="suggestion-box"
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span className="suggestion-desc" onClick={() => {this.setState({address: suggestion.description})}}>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default ItemLocationSearch;