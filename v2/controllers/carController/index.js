const { Car, Owner } = require('../../models');
const HTTPError = require('../../utils/Error');
const { catchAsync } = require('../../utils/catchAsync');

exports.getAllCars = catchAsync(async (req, res, next) => {});

exports.addCar = catchAsync(async (req, res, next) => {
  const { carDetails, ownerInfo } = req.body;

  const { vinNumber, regNumber } = carDetails;

  const carExists = await Car.findOne({
    $or: [{ regNumber }, { vinNumber }],
  });

  //if car exists send error message
  if (carExists)
    return next(
      new HTTPError('A vehicle with this VIN or Reg Number already exists', 400)
    );

  // TODO Information hash and block number

  const newCar = await Car.create({ ...carDetails });
  await Owner.create({ ...ownerInfo, carId: newCar.id });

  return res
    .status(201)
    .json({ message: `The new car has been added into the system.` });
});
