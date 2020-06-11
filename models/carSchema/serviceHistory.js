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
  sparePart1: {
    type: String,
  },
  sparePart2: {
    type: String,
  },
  sparePart3: {
    type: String,
  },
  isValid1: {
    type: String,
  },
  isValid2: {
    type: String,
  },
  isValid3: {
    type: String,
  },
});

const serviceHistory = mongoose.model("serviceHistory", serviceHistorySchema);

module.exports = serviceHistory;
