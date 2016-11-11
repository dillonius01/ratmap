'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Root from './components/Root';
import GMap from './components/GMap';
import store from './reducks/store';
import { Provider } from 'react-redux';


ReactDOM.render(
	<Provider store={store}>
	  <Router history={hashHistory}>
	    <Route path="/" component={ Root }>
	      <IndexRoute component={GMap} />
	    </Route>
	  </Router>
	</Provider>

,
  document.getElementById('app')
);
