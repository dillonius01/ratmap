import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, NavDropdown, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { fetchNonPassing, clearMarkers, fetchBorough } from '../reducks/markers';
import { setCenter, setBySearch } from '../reducks/center';
import { setZoom } from '../reducks/zoom';
import { setPlace, clearPlace } from '../reducks/place';
import { connect } from 'react-redux';


/* -----------------    COMPONENT     ------------------ */

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.byBorough = this.byBorough.bind(this);
		this.showAll = this.showAll.bind(this);
		this.clearAll = this.clearAll.bind(this);
	}

	byBorough(evt) {
		evt.preventDefault();
		const brgh = evt.target.name;
		this.props.borough(brgh);
		this.props.recenter(brgh);
		this.props.setzoom(12);
	}

	showAll(evt) {
		evt.preventDefault();
		this.props.infest();
		this.props.recenter('NYC');
		this.props.setzoom(11);
	}

	clearAll(evt) {
		evt.preventDefault();
		this.props.clear();
		this.props.clearplace();
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
    const { google, onquery, setzoom, setplace } = this.props;
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

      onquery(latlng);
      setzoom(16);
      setplace(place);
    });


	}

	render() {
		const { clear } = this.props;
		const props = this.props;
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
                    <input ref={ node => this.autocomplete = node } type="text" placeholder="Search" />
                  </FormGroup>
                  <Button type="submit">Find Rats</Button>
                </Navbar.Form>
				      </Nav>

				      <Nav pullRight>
				        <NavItem onClick={ this.clearAll }>Clear</NavItem>
				        <NavItem name="NYC" onClick={ this.showAll }>Infest!</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>

					{
						this.props.children
					}
				  </div>

		);
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ google }) => ({ google });

const mapDispatch = dispatch => ({
	infest: () => dispatch(fetchNonPassing()),
	clear: () => dispatch(clearMarkers()),
	clearplace: () => dispatch(clearPlace()),
	borough: br => dispatch(fetchBorough(br)),
	recenter: br => dispatch(setCenter(br)),
	setzoom: zoom => dispatch(setZoom(zoom)),
	onquery: latlng => dispatch(setBySearch(latlng)),
	setplace: place => dispatch(setPlace(place))
});

export default connect(mapState, mapDispatch)(Root);

