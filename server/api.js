const router = require('express').Router();
const soda = require('soda-js');
const Promise = require('bluebird');

// socrata info for Rat Information Portal
let consumer = new soda.Consumer('data.cityofnewyork.us');
const RATS = 'a2h9-9z38';

// constants for calculating data of however many years
const oneYearInMS = 1000 * 60 * 60 * 24 * 365;
const currentDate = Date.now();
const oneYearAgo = new Date(currentDate - oneYearInMS);


router.get('/allrats', function(req, res, next) {
	console.log('hit allrats route');
	consumer.query()
		.withDataset(RATS)
		.soql('SELECT * WHERE location IS NOT NULL AND result IS NOT NULL LIMIT 20000')
		.getRows()
			.on('success', rows => res.send(rows))
			.on('error', next)
});

router.get('/nonpassing', function(req, res, next) {
	console.log('hit allrats route');
	consumer.query()
		.withDataset(RATS)
		.soql('SELECT * WHERE location IS NOT NULL AND result != "Passed Inspection" LIMIT 5000')
		.getRows()
			.on('success', rows => res.send(rows))
			.on('error', next)

})


module.exports = router;

// swig ql
// geo json || d3js for data visualization
// https://vida.io/documents/4vZ9mRGyepoyQxFcK