import React, { Component } from 'react';
import { InfoWindow, Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Loader from 'react-loader';

import { GMAP_API_KEY } from '../apiKeys';

import { styles, iconURLs, sanitizePopup } from '../utils';
import { connect } from 'react-redux';

import { setGoogle } from '../reducks/google';
import { endLoading } from '../reducks/loading';


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
    const { google, initGoogle, hidespinner } = this.props;
    if (this.props.center !== prevProps.center) {
      this.setState({
        currentLocation: this.props.center
      });
    }

    if (google && google !== prevProps.google) {
      initGoogle(google);
    }

    if (prevProps.markers !== this.props.markers) {
      hidespinner();
    }

    // need to test below line
    if (prevProps.place != this.props.place) {
      hidespinner();
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


  render() {
    if (!this.props.loaded) {
      return <Loader />;
    }

    const { google, zoom, center, markers, place, score } = this.props;

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
          onClick={this.onMarkerClick}
        />


        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            {
              this.state.selectedPlace.wd ?
                <div>
                  <h4>{this.state.selectedPlace.wd.house_number} {this.state.selectedPlace.wd.street_name}</h4>
                  <p>
                    Status: {this.state.selectedPlace.wd.result}<br></br>
                    Inspection Date: {this.state.selectedPlace.wd.inspection_date}
                  </p>
                </div>
              :
                <div>
                  <h4>{ place.name }</h4>
                  <h5>Pass rate: { Math.round(100 * score) }%</h5>
                </div>

            }


        </InfoWindow>

      </Map>
    );
  }
}

/*
          centerAroundCurrentLocation={true}

*/

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ markers, center, zoom, place, score }) => ({ markers, center, zoom, place, score });
const mapDispatch = dispatch => ({
  initGoogle: google => dispatch(setGoogle(google)),
  hidespinner: () => dispatch(endLoading())
})


const Wrapped = GoogleApiWrapper({
  apiKey: GMAP_API_KEY
})(Container);

export default connect(mapState, mapDispatch)(Wrapped);

