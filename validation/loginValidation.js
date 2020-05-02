const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so we can use validator
  (data.email = !isEmpty(data.email) ? data.email : ""),
    (data.password = !isEmpty(data.password) ? data.password : "");
  data.typeOfUser = !isEmpty(data.typeOfUser) ? data.typeOfUser : "";

  //Email checks
  if (Validator.isEmpty(data.email)) {
    errors.emailEmpty = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.emailInvalid = "Email is invalid";
  }

  //Password check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //Type Checks
  if (Validator.isEmpty(data.typeOfUser)) {
    errors.typeOfUser = "Please select an option to Login";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
