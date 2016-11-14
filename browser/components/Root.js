import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, MenuItem, NavDropdown, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import Loader from 'react-loader';

import { fetchNonPassing, clearMarkers, fetchBorough, fetchWithinDistance } from '../reducks/markers';
import { setCenter, setBySearch } from '../reducks/center';
import { setZoom } from '../reducks/zoom';
import { setPlace, clearPlace } from '../reducks/place';
import { fetchScore } from '../reducks/score';
import { startLoading } from '../reducks/loading';


/* -----------------    COMPONENT     ------------------ */

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.byBorough = this.byBorough.bind(this);
		this.showAll = this.showAll.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.byPoint = this.byPoint.bind(this);
	}

	byBorough(evt) {
		evt.preventDefault();
		const brgh = evt.target.name;
		const { borough, recenter, setzoom, startspinner } = this.props;
		startspinner();
		borough(brgh);
		recenter(brgh);
		setzoom(12);
	}

	byPoint(evt) {
		evt.preventDefault();
		const { place, bypoint, getscore, startspinner } = this.props;
		if (!place) return;
		const lat = place.geometry.location.lat();
		const lng = place.geometry.location.lng();
		const brgh = place.vicinity;
		startspinner();
		bypoint(lat, lng, brgh);
		getscore(lat, lng, brgh);
	}

	showAll(evt) {
		evt.preventDefault();
		const { infest, recenter, setzoom, startspinner } = this.props;
		startspinner();
		infest();
		recenter('NYC');
		setzoom(11);
	}

	clearAll(evt) {
		evt.preventDefault();
		const { clear, clearplace } = this.props;
		clear();
		clearplace();
	}

	componentDidMount() {
		const { google } = this.props;
		if (!google) return;
		this.renderAutoComplete();
	}

	componentDidUpdate() {
		const { google } = this.props;
		if (!google) return;
		this.renderAutoComplete();
	}

	renderAutoComplete() {
    const { google, onquery, setzoom, setplace, startspinner } = this.props;
    if (!google) return;

    const node = this.autocomplete;
    var autocomplete = new google.maps.places.Autocomplete(node);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      startspinner();
      onquery(latlng);
      setzoom(16);
      setplace(place);
      this.setState({ hasPlace: true });
    });


	}

	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>RatMap</Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse id="nav-collapse">
				      <Nav id="nav">
				        <NavDropdown id="brgh-root" title="Boroughs">
				          <MenuItem id="brgh-1" name="Manhattan" onClick={this.byBorough}>Manhattan</MenuItem>
				          <MenuItem id="brgh-2" name="Brooklyn" onClick={this.byBorough}>Brooklyn</MenuItem>
				          <MenuItem id="brgh-3" name="Queens" onClick={this.byBorough}>Queens</MenuItem>
				          <MenuItem id="brgh-4" name="Bronx" onClick={this.byBorough}>Bronx</MenuItem>
				          <MenuItem id="brgh-5" name="Staten Island" onClick={this.byBorough}>Staten Island</MenuItem>
				        </NavDropdown>
				      </Nav>

				      <Nav>
				        <Navbar.Form>
                  <FormGroup>
                    <input ref={ node => this.autocomplete = node } type="text" placeholder="Search" id="search" />
                  </FormGroup>
                  <Button className="btn-warning" onClick={ this.byPoint }>Find Nearby</Button>
                </Navbar.Form>
				      </Nav>

				      <Nav pullRight>
				        <NavItem onClick={ this.clearAll }>Clear</NavItem>
				        <NavItem name="NYC" onClick={ this.showAll }>Infest!</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
				  <Loader
				  	loaded={!this.props.loading}
				  />
					{
						this.props.children
					}
				  </div>

		);
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ google, place, score, loading }) => ({ google, place, score, loading });

const mapDispatch = dispatch => ({
	infest: () => dispatch(fetchNonPassing()),
	clear: () => dispatch(clearMarkers()),
	clearplace: () => dispatch(clearPlace()),
	borough: br => dispatch(fetchBorough(br)),
	recenter: br => dispatch(setCenter(br)),
	setzoom: zoom => dispatch(setZoom(zoom)),
	onquery: latlng => dispatch(setBySearch(latlng)),
	setplace: place => dispatch(setPlace(place)),
	bypoint: (lat, lng, brgh) => dispatch(fetchWithinDistance(lat, lng, brgh)),
	getscore: (lat, lng, brgh) => dispatch(fetchScore(lat, lng, brgh)),
	startspinner: () => dispatch(startLoading())
});

export default connect(mapState, mapDispatch)(Root);


				      // <Nav>
          //       <NavDropdown title="Choose Location">
	         //        <MenuItem onClick={ this.byPoint } >Visualize</MenuItem>
          //         <MenuItem onClick={ this.getScore } >Get Score</MenuItem>
          //       </NavDropdown>
				      // </Nav>

