const router = require('express').Router();
const api = require('./api');

router.use('/api', api)

router.get('/', function(req, res, next) {
	res.render('index');
})


module.exports = router;