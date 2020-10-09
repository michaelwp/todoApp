// environment variable configuration
require('dotenv').config();

// express framework
const express = require('express');

const app = express();

// accept language configuration (default english)
const { language } = require('./middleware');

app.use(language.set);

// database model
require('./model');

// accept body with json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
const router = require('./api/v1/router');

app.use('/api', router);

// error handler
const errorHandler = require('./error_handler');

app.use(errorHandler);

module.exports = app;
