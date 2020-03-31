const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownershipHistorySchema = new Schema({
  reg: String,
  //Year new owner purchased vehicle
  yearPurchased: String,
  //millage at the time of purchase
  millage: Int16Array,
  ownerName: String,
  ownerCNIC: Int16Array,
  ownerContact: Int16Array
});

const ownershipHistory = mongoose.model(
  "ownershipHistory",
  ownershipHistorySchema
);

module.exports = ownershipHistory;
