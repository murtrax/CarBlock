const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_TOKEN_KEY || 'secret', {
    expiresIn: '5000000',
  });
};
