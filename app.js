const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const routes = require('./server/routes');

const PORT = 3000;

let app = express();

// Nunjucks configure engine
nunjucks.configure('views');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


// logging and parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve dependencies
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));

// serve static files
app.use(express.static('public'))

// serve page routes
app.use(routes);


app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(`CAUGHT ERROR ${err}`);
	res.render('error', {
		message: err.message
	})
})

app.listen(PORT, function() {
	console.log(`Server listening on port ${PORT}!`)
})