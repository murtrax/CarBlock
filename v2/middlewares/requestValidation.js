const HTTPError = require('../utils/Error');

exports.requestValidation = (schema) => async (req, res, next) => {
  const { query, body, params } = req;

  // Test Query String Params
  const { error: queryError } = await schema?.queryStringParameters?.validate(
    query
  );
  if (queryError) return next(returnCustomError());

  // Test Req Body
  const { error: bodyError } = await schema?.body?.validate(body);
  if (bodyError) return next(returnCustomError());

  // Test Path Params
  const { error: pathError } = await schema?.pathParameters?.validate(params);
  if (pathError) return next(returnCustomError());

  next();
};

const returnCustomError = (message = 'Invalid request') => {
  return new HTTPError(message, 400);
};
