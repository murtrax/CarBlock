const Joi = require('joi');

const getAllCarsSchema = {
  queryStringParameters: Joi.object({}),
  body: Joi.object({}),
  pathParameters: Joi.object({}),
};

const addCarSchema = {
  queryStringParameters: Joi.object({}),
  body: Joi.object({
    carDetails: Joi.object({
      vinNumber: Joi.string().required(),
      regNumber: Joi.string().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      variant: Joi.string(),
      yearOfManufacture: Joi.number().required(),
      vehicleType: Joi.string()
        .valid('SUV', 'SEDAN', 'HATCHBACK', 'CROSS-OVER')
        .required(),
      fuel: Joi.string()
        .valid('Diesel', 'Gasoline', 'Hybrid', 'Electric')
        .required(),
      drive: Joi.string()
        .valid('Front wheel drive', 'Rear wheel drive', 'All wheel drive')
        .required(),
    }).required(),
    ownerInfo: Joi.object({
      name: Joi.string().required(),
      cnic: Joi.string().required(), // TODO add pattern validation
      contactNumber: Joi.number().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      yearOfPurchase: Joi.number().required(),
      millage: Joi.number().required(),
    }).required(),
  }),
  pathParameters: Joi.object({}),
};

module.exports = {
  getAllCarsSchema,
  addCarSchema,
};
