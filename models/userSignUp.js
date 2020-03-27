const mongoose = require("mongoose");

//declare schema for model
const Schema = mongoose.Schema;
const userSignUpSchema = new Schema({
  //define fields and their types
  fullName: String,
  email: String,
  userName: String,
  password: String
});

//create a model with schema
const userSignUp = mongoose.model("userSignUp", userSignUpSchema);

//export the model
module.exports = userSignUp;
