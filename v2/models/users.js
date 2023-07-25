const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'firstName is required'] },
  lastName: { type: String, required: [true, 'lastName is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password is required'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: { type: Date, select: false },
  role: {
    type: String,
    enum: { values: [ROLES.ADMIN, ROLES.USER], message: 'Invalid role value' },
    default: ROLES.USER,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Checks if password was changed after issuance of jwt token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

module.exports = mongoose.model('users', userSchema);
