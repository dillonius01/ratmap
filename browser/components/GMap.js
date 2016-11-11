import React from 'react';
import { InfoWindow, Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { GMAPI } from '../apiKeys';
import { styles, iconURLs } from '../utils';
import { connect } from 'react-redux';


/* -----------------    COMPONENT     ------------------ */

const Container = React.createClass({
 getInitialState: function() {
  return {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
 },

  onMarkerClick: function(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  },

  onInfoWindowClose: function() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  },

  onMapClicked: function(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  },

  render: function() {
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
          zoom={12}
          initialCenter={{
            lat: 40.7484405,
            lng: -73.9878531
          }}
          containerStyle={{}}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved}>


        {
          this.props.markers && this.props.markers.length ? 
            this.props.markers.map((marker, index) => (
              <Marker
                icon={iconURLs[marker.result]}
                position={{lat: +marker.latitude, lng: +marker.longitude}}
                onClick={this.onMarkerClick}
                name={marker.job_id}
                key={index}
                wd={{
                  house_number: marker.house_number || '',
                  street_name: marker.street_name,
                  inspection_date: marker.inspection_date.slice(0, 10)
                }}
              />
            ))
            :
          <Marker
            icon="/public/images/gray-sm.png"
          />
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
});

/*


          centerAroundCurrentLocation={true}


  <div>
      <h4>{inspection.house_number || ''} {inspection.street_name}</h4>
      <p>Status: ${inspection.result}</p>
      <p>Inspection Date: {inspection.inspection_date.slice(0, 10)}</p>
    </div>






*/

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ markers }) => ({ markers });
// const mapDispatch = dispatch => ({})


const Wrapped = GoogleApiWrapper({
  apiKey: GMAPI
})(Container);

export default connect(mapState, null)(Wrapped);

