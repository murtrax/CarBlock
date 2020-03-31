const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyRegistrationTempSchema = new Schema({
  ownerName: String,
  ownerPosition: String,
  ownerContact: String,
  ownerCNIC: String,
  companyName: String,
  companyEmail: String,
  companyPassword: String,
  companyContact: String,
  companyAddres: String,
  companyCity: String,
  companyZip: String,
  approved: Boolean
});

const companyRegistrationTemp = mongoose.model(
  "companyRegistrationTemp",
  companyRegistrationTempSchema
);

module.exports = companyRegistrationTemp;
