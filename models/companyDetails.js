const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const companyDetailsSchema = new Schema({
  //make schema
});

const companyDetails = mongoose.model("companyDetails", companyDetailsSchema);

module.exports = companyDetails;
