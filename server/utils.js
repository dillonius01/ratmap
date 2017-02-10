// socrata info for Rat Information Portal
const soda = require('soda-js');
let consumer = new soda.Consumer('data.cityofnewyork.us');
const RATS = 'a2h9-9z38';


const utils = {};

utils.calcDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

utils.sanitizeBorough = vicinity => {
	let borough;
	if (vicinity.match(/Manhattan/)) { borough = 'Manhattan' }
	else if (vicinity.match(/Brooklyn/)) { borough = 'Brooklyn' }
	else if (vicinity.match(/Queens/)) { borough = 'Queens' }
	else if (vicinity.match(/Bronx/)) { borough = 'Bronx' }
	else if (vicinity.match(/Staten Island/)) { borough = 'Staten Island' }
	else throw new Error('invalid borough passed');
	return borough;

};


utils.makeQueryPromise = query => {
	return new Promise((resolve, reject) => {
		consumer.query()
			.withDataset(RATS)
			.soql(query)
			.getRows()
				.on('success', rows => resolve(rows))
				.on('error', err => reject(err))
	});
};

module.exports = utils;
