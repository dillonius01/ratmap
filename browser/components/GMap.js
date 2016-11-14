import React, { Component } from 'react';
import { InfoWindow, Map, GoogleApiWrapper, Marker } from 'google-maps-react';


import { GMAPI } from '../apiKeys';
import { styles, iconURLs, sanitizePopup } from '../utils';
import { connect } from 'react-redux';

import { setGoogle } from '../reducks/google';

/* -----------------    COMPONENT     ------------------ */

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { google, initGoogle } = this.props;
    if (this.props.center !== prevProps.center) {
      this.setState({
        currentLocation: this.props.center
      });
    }

    if (google && google !== prevProps.google) {
      initGoogle(google);
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    const { google, zoom, center, markers, place } = this.props;

    return (
      <Map
          google={ google }
          style={{
          	width: '100vw',
          	height: '93vh',
          	position: 'relative'
          }}
          styles={styles}
          className={'map'}
          zoom={ zoom }
          initialCenter={{
            lat: 40.7484405,
            lng: -73.9878531
          }}
          center={ center }
          containerStyle={{}}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved}>


        {
          markers && markers.map((marker, index) => (
              <Marker
                icon={iconURLs[marker.result]}
                position={{lat: +marker.latitude, lng: +marker.longitude}}
                onClick={this.onMarkerClick}
                name={marker.job_id}
                key={index}
                wd={{
                  house_number: sanitizePopup(marker.house_number),
                  street_name: marker.street_name,
                  inspection_date: marker.inspection_date.slice(0, 10),
                  result: marker.result
                }}
              />
            ))
        }
        
        <Marker
          position={{
            lat: place.geometry && place.geometry.location.lat(),
            lng: place.geometry && place.geometry.location.lng()
          }}
          icon={iconURLs.place}
        />


        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <h4>{this.state.selectedPlace.wd && this.state.selectedPlace.wd.house_number} {this.state.selectedPlace.wd && this.state.selectedPlace.wd.street_name}</h4>
              <p>
                Status: {this.state.selectedPlace.wd && this.state.selectedPlace.wd.result}<br></br>
                Inspection Date: {this.state.selectedPlace.wd && this.state.selectedPlace.wd.inspection_date}
              </p>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

/*
          centerAroundCurrentLocation={true}

*/

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ markers, center, zoom, place }) => ({ markers, center, zoom, place });
const mapDispatch = dispatch => ({
  initGoogle: google => dispatch(setGoogle(google))
})


const Wrapped = GoogleApiWrapper({
  apiKey: GMAPI
})(Container);

export default connect(mapState, mapDispatch)(Wrapped);

