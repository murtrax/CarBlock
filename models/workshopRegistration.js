const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyRegistrationSchema = new Schema({
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
  companyZip: String
});

const companyRegistration = mongoose.model(
  "companyRegistration",
  companyRegistrationSchema
);

module.exports = companyRegistration;
