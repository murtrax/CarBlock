const express = require('express');
const { requestValidation, authenticate } = require('../middlewares');
const {
  getAllCarsSchema,
  addCarSchema,
} = require('../controllers/carController/schema');
const { getAllCars, addCar } = require('../controllers/carController');

const router = express.Router();

router
  .route('/')
  .get(requestValidation(getAllCarsSchema), getAllCars)
  .post(authenticate, requestValidation(addCarSchema), addCar);

module.exports = router;
