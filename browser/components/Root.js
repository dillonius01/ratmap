import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, Button, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchNonPassing } from '../reducks/markers';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Navigation extends React.Component {
	constructor(props) {
		super(props)
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
				          <MenuItem id="brgh-1">Manhattan</MenuItem>
				          <MenuItem id="brgh-2">Brooklyn</MenuItem>
				          <MenuItem id="brgh-3">Queens</MenuItem>
				          <MenuItem id="brgh-4">Bronx</MenuItem>
				          <MenuItem id="brgh-5">Staten Island</MenuItem>
				        </NavDropdown>
				      </Nav>
				      <Nav pullRight>
				        <NavItem >Clear</NavItem>
				        <NavItem onClick={ this.props.infest }>Infest!</NavItem>
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
	infest: () => dispatch(fetchNonPassing())
})

export default connect(null, mapDispatch)(Navigation);
