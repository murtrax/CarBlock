const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sparePartSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
  
});

const sparePart = mongoose.model(
  "sparePart",
  sparePartSchema
);

module.exports = sparePart;
