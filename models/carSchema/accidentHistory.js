const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accidentHistorySchema = new Schema({
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
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const accidentHistory = mongoose.model(
  "accidentHistory",
  accidentHistorySchema
);

module.exports = accidentHistory;
