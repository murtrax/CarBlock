const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownershipHistorySchema = new Schema({
  vin: {
    type: String,
    required: true,
  },
  reg: {
    type: String,
    required: true,
  },
  //Year new owner purchased vehicle
  yearPurchased: {
    type: String,
    required: true,
  },
  //millage at the time of purchase
  millage: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerCNIC: {
    type: String,
    required: true,
  },
  ownerContact: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const ownershipHistory = mongoose.model(
  "ownershipHistory",
  ownershipHistorySchema
);

module.exports = ownershipHistory;
