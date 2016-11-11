import React, { Component } from 'react';
import { InfoWindow, Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { GMAPI } from '../apiKeys';
import { styles, iconURLs } from '../utils';
import { connect } from 'react-redux';


/* -----------------    COMPONENT     ------------------ */

class Container extends Component {
 constructor(props) {
  super(props)
  this.state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }
  this.onMarkerClick = this.onMarkerClick.bind(this);
  this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  this.setState = this.setState.bind(this);
 }

 componentDidUpdate(prevProps, prevState) {
  if (this.props.center !== prevProps.center) {
    this.setState({
      currentLocation: this.props.center
    })
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

    return (
      <Map
          google={this.props.google}
          style={{
          	width: '100vw',
          	height: '93vh',
          	position: 'relative'
          }}
          styles={styles}
          className={'map'}
          zoom={this.props.zoom || 11}
          initialCenter={{
            lat: 40.7484405,
            lng: -73.9878531
          }}
          center={this.props.center}
          containerStyle={{}}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved}>


        {
          this.props.markers && this.props.markers.map((marker, index) => (
              <Marker
                icon={iconURLs[marker.result]}
                position={{lat: +marker.latitude, lng: +marker.longitude}}
                onClick={this.onMarkerClick}
                name={marker.job_id}
                key={index}
                wd={{
                  house_number: marker.house_number || '',
                  street_name: marker.street_name,
                  inspection_date: marker.inspection_date.slice(0, 10),
                  result: marker.result
                }}
              />
            ))
        }

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

const mapState = ({ markers, center, zoom }) => ({ markers, center, zoom });
// const mapDispatch = dispatch => ({})


const Wrapped = GoogleApiWrapper({
  apiKey: GMAPI
})(Container);

export default connect(mapState, null)(Wrapped);

