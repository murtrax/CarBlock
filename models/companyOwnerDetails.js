const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const companyOwnerDetailsSchema = new Schema({
  //make schema
});

const companyOwnerDetails = mongoose.model(
  "companyOwnerDetails",
  companyOwnerDetailsSchema
);

module.exports = companyOwnerDetails;
