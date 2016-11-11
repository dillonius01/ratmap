'use strict';

const express = require('express');
const volleyball = require('volleyball');
const api = require('./api');

const app = express();

app.use(volleyball);

app.use(express.static(__dirname));

app.use('/api', api);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(`CAUGHT ERROR ${err}`);
  res.render('error', {
    message: err.message
  });
});


app.listen(3000, function () {
  console.log('Server listening on port', 3000);
});

