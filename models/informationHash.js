const mongoose = require("mongoose");

//declare schema for model
const Schema = mongoose.Schema;
const informationHashSchema = new Schema({
  vin: {
    type: String,
    required: true,
  },
  reg: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
});

//create a model with schema
const informationHash = mongoose.model(
  "informationHash",
  informationHashSchema
);

//export the model
module.exports = informationHash;
