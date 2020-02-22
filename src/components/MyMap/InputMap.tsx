import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';



class InputMap extends Component <any, any>{
  constructor(props : any) {
    super(props);
    this.state = { 
        address: '' ,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (address: string) => {
    this.setState({ address: address });
  };

  render() {
    return (
        <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.props.triggerParentUpdate}
        >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Buscar lugar...',
              className: 'location-search-input form-control',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
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

export default InputMap;

