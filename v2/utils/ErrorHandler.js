const HTTPError = require('./Error');

const sendProductionError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({ message: 'Something went wrong' });
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    console.log(err.message);
    return res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  let error = { ...err, message: err.message };

  if (error.name === 'TokenExpiredError')
    error = new HTTPError(`Token has expired!`, 401);

  if (error.name === 'JsonWebTokenError')
    error = new HTTPError(`Invalid token`, 401);

  sendProductionError(error, res);
};
