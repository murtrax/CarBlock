const Joi = require('joi');

const loginSchema = {
  queryStringParameters: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  pathParameters: Joi.object({}),
};

const signupSchema = {
  queryStringParameters: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().max(10).required(),
    lastName: Joi.string().max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    passwordConfirm: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  }),
  pathParameters: Joi.object({}),
};

const changePasswordSchema = {
  queryStringParameters: Joi.object({}),
  body: Joi.object({
    currentPassword: Joi.string().required(),
    updatedPassword: Joi.string().required(),
    updatedPasswordConfirm: Joi.string().required(),
  }),
  pathParameters: Joi.object({}),
};

module.exports = {
  loginSchema,
  signupSchema,
  changePasswordSchema,
};
