const mongoose = require('mongoose');

const carDetailsSchema = new mongoose.Schema({
  vinNumber: {
    type: String,
    required: [true, 'Vin number is required'],
  },
  regNumber: {
    type: String,
    required: [true, 'Registration number is required'],
  },
  make: {
    type: String,
    required: [true, 'Make is required'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  variant: {
    type: String,
    // default: 'N/A',
    // e.g. Corolla Altis, Corolla Gli
  },
  yearOfManufacture: {
    type: number,
    required: [true, 'Year is required'],
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle Type is required'],
    enum: {
      values: ['SUV', 'SEDAN', 'HATCHBACK', 'CROSS-OVER'],
      message: 'Invalid vehicle type value',
    },
  },
  fuel: {
    type: String,
    required: [true, 'Fuel type is required'],
    enum: {
      values: ['Diesel', 'Gasoline', 'Hybrid', 'Electric'],
      message: 'Invalid fuel type value',
    },
  },
  drive: {
    type: String,
    required: [true, 'Drive is required'],
    enum: {
      values: ['Front wheel drive', 'Rear wheel drive', 'All wheel drive'],
      message: 'Invalid drive type value',
    },
  },
});

module.exports = mongoose.model('cars', carDetailsSchema);
