const express = require('express');
const routes = require('./routes/routes');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

// ROUTES
app.use('/', routes);

module.exports = app;
