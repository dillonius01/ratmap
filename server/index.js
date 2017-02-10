'use strict';

const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const api = require('./api');
const { resolve } = require('path');

const app = express();


app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(resolve(__dirname, '../public')));

app.use('/api', api);

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(`CAUGHT ERROR ${err}`);
  res.json(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

