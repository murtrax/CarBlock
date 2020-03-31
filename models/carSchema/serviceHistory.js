const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceHistorySchema = new Schema({
  reg: String,
  date: String,
  //millage at the time of service
  millage: Int16Array,
  garage: String,
  //the details of what was performed on the vehicle
  comments: String,
  ownerCNIC: String
});

const serviceHistory = mongoose.model("serviceHistory", serviceHistorySchema);

module.exports = serviceHistory;
