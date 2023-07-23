const jwt = require('jsonwebtoken');
const HTTPError = require('../../utils/Error');
const { User } = require('../../models');
const { catchAsync } = require('../../utils/catchAsync');

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_TOKEN_KEY || 'secret', {
    expiresIn: '5000000',
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new HTTPError('User does not exist', 404));

  // Compare passwords
  if (!(await user.comparePasswords(password, user.password)))
    return next(new HTTPError('Invalid email/password', 400));

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return res.status(200).json({ token });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new HTTPError(`User already exists`, 400));
  }

  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  const token = generateToken({
    id: createdUser._id,
    email: createdUser.email,
  });

  return res.status(201).json({
    token,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, updatedPassword, updatedPasswordConfirm } = req.body;

  if (currentPassword === updatedPassword)
    return next(
      new HTTPError('Current and Updated passwords cannot be the same', 400)
    );

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.comparePasswords(currentPassword, user.password)))
    return next(new HTTPError(`Incorrect password`, 401));

  user.password = updatedPassword;
  user.passwordConfirm = updatedPasswordConfirm;
  user.passwordChangedAt = Date.now();

  await user.save();

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return res.status(200).json({ message: 'success', token });
});
