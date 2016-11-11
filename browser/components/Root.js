import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, Button, NavDropdown, NavItem } from 'react-bootstrap';
import { fetchNonPassing, clearMarkers, fetchBorough } from '../reducks/markers';
import { setCenter } from '../reducks/center';
import { setZoom } from '../reducks/zoom';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.byBorough = this.byBorough.bind(this);
		this.showAll = this.showAll.bind(this);
	}

	byBorough(evt) {
		evt.preventDefault();
		const brgh = evt.target.name;
		this.props.borough(brgh);
		this.props.recenter(brgh);
		this.props.setzoom(brgh)
	}

	showAll(evt) {
		evt.preventDefault();
		this.props.infest();
		this.props.recenter('NYC')
		this.props.setzoom('NYC')
	}

	render() {
		const { clear } = this.props;
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
				          <MenuItem id="brgh-5" name="StatenIsland" onClick={this.byBorough}>Staten Island</MenuItem>
				        </NavDropdown>
				      </Nav>
				      <Nav pullRight>
				        <NavItem onClick={ clear }>Clear</NavItem>
				        <NavItem name="NYC" onClick={ this.showAll }>Infest!</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			  	{ this.props.children }
			  </div>

		)
	}
}

/* -----------------    CONTAINER     ------------------ */

// const mapState = ({}) => ({});

const mapDispatch = dispatch => ({
	infest: () => dispatch(fetchNonPassing()),
	clear: () => dispatch(clearMarkers()),
	borough: br => dispatch(fetchBorough(br)),
	recenter: br => dispatch(setCenter(br)),
	setzoom: br => dispatch(setZoom(br))
});

export default connect(null, mapDispatch)(Navigation);
