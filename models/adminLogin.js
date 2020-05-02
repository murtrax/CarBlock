const mongoose = require("mongoose");

//declare schema for model
const Schema = mongoose.Schema;
const adminLoginSchema = new Schema({
  //define fields and their types
  fullName: String,
  email: String,
  password: String,
});

//create a model with schema
const adminLogin = mongoose.model("adminLogin", adminLoginSchema);

//export the model
module.exports = adminLogin;
