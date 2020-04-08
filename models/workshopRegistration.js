const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyRegistrationSchema = new Schema({
  ownerName: {
    type: String,
    required: true
  },
  ownerPosition: {
    type: String,
    required: true
  },
  ownerContact:  {
    type: String,
    required: true
  },
  ownerCNIC:  {
    type: String,
    required: true
  },
  companyName:  {
    type: String,
    required: true
  },
  companyEmail:  {
    type: String,
    required: true
  },
  companyPassword:  {
    type: String,
    required: true
  },
  companyContact:  {
    type: String,
    required: true
  },
  companyAddress:  {
    type: String,
    required: true
  },
  companyCity:  {
    type: String,
    required: true
  },
  companyZip:  {
    type: String,
    required: true
  },
});

const companyRegistration = mongoose.model(
  "companyRegistration",
  companyRegistrationSchema
);

module.exports = companyRegistration;
