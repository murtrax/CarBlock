const mongoose = require("mongoose");

//declare schema for model
const Schema = mongoose.Schema;
const companySignUpSchema = new Schema({
  //define fields and their types
  companyName: String,
  companyEmail: String,
  companyPassword: String
});

//create a model with schema
const companySignUp = mongoose.model("userSignUp", companySignUpSchema);

//export the model
module.exports = companySignUp;
