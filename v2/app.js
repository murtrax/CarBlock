const express = require('express');
const { authRoutes } = require('./routes');
const morgan = require('morgan');
const { globalErrorHandler } = require('./utils/ErrorHandler');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

// ROUTES
app.use('/auth', authRoutes);

app.use(globalErrorHandler);

module.exports = app;
