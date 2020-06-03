const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceHistorySchema = new Schema({
  vin: {
    type: String,
    required: true,
  },
  reg: {
    type: String,
    required: true,
  },
  millage: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const serviceHistory = mongoose.model("serviceHistory", serviceHistorySchema);

module.exports = serviceHistory;
