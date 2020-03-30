const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accidentHistorySchema = new Schema({
  reg: String,
  date: String,
  //millage at the time of service
  millage: Int16Array,
  garage: String,
  //the details of what type of accident was it, front end collision
  comments: String,
  //were any airbags deployed, yes or no
  airBagsDeployed: Boolean,
  sturturalDamage: Boolean,
  ownerCNIC: String
});

const accidentHistory = mongoose.model(
  "accidentHistorySchema",
  accidentHistorySchema
);

module.exports = accidentHistory;
