const router = require('express').Router();
const utils = require('./serverUtils');


// constants for calculating data of however many years
// const oneYearInMS = 1000 * 60 * 60 * 24 * 365;
// const currentDate = Date.now();
// const oneYearAgo = new Date(currentDate - oneYearInMS);


router.get('/allrats', function(req, res, next) {
	const queryString = 'SELECT * WHERE location IS NOT NULL AND result IS NOT NULL LIMIT 10000';
	utils.makeQueryPromise(queryString)
		.then(inspections => res.send(inspections))
		.catch(next)
});

router.get('/nonpassing', function(req, res, next) {
	const queryString = 'SELECT * WHERE location IS NOT NULL AND result != "Passed Inspection" LIMIT 5000'
	utils.makeQueryPromise(queryString)
		.then(inspections => res.send(inspections))
		.catch(next)
});

router.get('/borough/:borough', function(req, res, next) {
	const queryString = String.raw`SELECT * WHERE location IS NOT NULL AND borough = "${req.params.borough}" AND result != "Passed Inspection" LIMIT 2000`
	utils.makeQueryPromise(queryString)
		.then(inspections => res.send(inspections))
		.catch(next)
});


router.get('/distance/:lat/:lng/:brgh', function(req, res, next) {
	const borough = utils.sanitizeBorough(req.params.brgh);
	const lat1 = req.params.lat;
	const lon1 = req.params.lng;
	const queryString = String.raw`SELECT * WHERE location IS NOT NULL AND borough = "${borough}" AND result != "Passed Inspection" LIMIT 30000`
	utils.makeQueryPromise(queryString)
		.then(inspections => {
			return inspections.filter(inspection => {
				const lat2 = +inspection.latitude;
				const lon2 = +inspection.longitude;
				return utils.calcDistance(lat1, lon1, lat2, lon2) <= 1;
			});
		})
		.then(filtered => res.send(filtered))
		.catch(next)

});


router.get('/score/:lat/:lng/:brgh', function(req, res, next) {
	console.log('hit crazy math distance route');
	const borough = utils.sanitizeBorough(req.params.brgh);
	const lat1 = req.params.lat;
	const lon1 = req.params.lng;
	const queryString = String.raw`SELECT * WHERE location IS NOT NULL AND borough = "${borough}" LIMIT 30000`;
	utils.makeQueryPromise(queryString)
		.then(inspections => {
			return inspections.filter(inspection => {
				const lat2 = +inspection.latitude;
				const lon2 = +inspection.longitude;
				return utils.calcDistance(lat1, lon1, lat2, lon2) <= 1;
			});
		})
		.then(filtered => {
			const passing = filtered.filter(row => {
				return row.result === 'Passed Inspection';
			})
			return passing.length / filtered.length;
		})
		.then(score => {
			console.log('score is', score);
			res.send({ score })
	})
		.catch(next)

});


module.exports = router;

// swig ql
// geo json || d3js for data visualization
// https://vida.io/documents/4vZ9mRGyepoyQxFcK