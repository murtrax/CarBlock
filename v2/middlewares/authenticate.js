const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const HTTPError = require('../utils/Error');
const { catchAsync } = require('../utils/catchAsync');
const { User } = require('../models');

exports.authenticate = catchAsync(async (req, res, next) => {
  let token;

  // Check if token is present
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new HTTPError(`Unauthorized`, 401));

  // Check if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_KEY);

  // Check if user exists
  const user = await User.findById(decoded.id);

  if (!user) return next(new HTTPError(`User does not exist`, 401));

  // Check if user has changed password since jwt has been issued
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new HTTPError(`User recently changed password! Please log in again.`, 401)
    );

  // Grant access
  req.user = user;
  next();
});
