const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownershipHistorySchema = new Schema({
  vin: String,
  reg: String,
  //Year new owner purchased vehicle
  yearPurchased: String,
  //millage at the time of purchase
  millage: String,
  city: String,
  state: String,
  ownerName: String,
  ownerCNIC: String,
  ownerContact: String
});

const ownershipHistory = mongoose.model(
  "ownershipHistory",
  ownershipHistorySchema
);

module.exports = ownershipHistory;
