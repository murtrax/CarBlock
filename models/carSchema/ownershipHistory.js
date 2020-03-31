const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownershipHistorySchema = new Schema({
<<<<<<< HEAD
  vin: String,
=======
>>>>>>> Hassaan
  reg: String,
  //Year new owner purchased vehicle
  yearPurchased: String,
  //millage at the time of purchase
<<<<<<< HEAD
  millage: String,
  city: String,
  state: String,
  ownerName: String,
  ownerCNIC: String,
  ownerContact: String
=======
  millage: Int16Array,
  ownerName: String,
  ownerCNIC: Int16Array,
  ownerContact: Int16Array
>>>>>>> Hassaan
});

const ownershipHistory = mongoose.model(
  "ownershipHistory",
  ownershipHistorySchema
);

module.exports = ownershipHistory;
