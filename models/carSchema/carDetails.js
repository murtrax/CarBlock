const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carDetailsSchema = new Schema({
  vin: {
    type: String,
    required: true
  },
  reg: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  //year vehicle was made
  year: {
    type: String,
    required: true
  },
  //E.G Corolla Altis, Corolla Gli
  variant: {
    type: String,
    default: "N/A"
  },
  //E.G SUV 5-DR, SEDAN 4-DR
  type: {
    type: String,
    required: true
  },
  //E.G Diesel,Gasoline
  fuel: {
    type: String,
    required: true
  },
  //E.G FWD (Front wheel drive) RWD Rear Wheel drive )
  drive: {
    type: String,
    required: true
  }
});

const carDetails = mongoose.model("carDetails", carDetailsSchema);

module.exports = carDetails;
