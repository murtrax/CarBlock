const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserSignUp(data) {
  let errors = {};

  //Convert empty fields to an empty string so we can use validator
  (data.email = !isEmpty(data.email) ? data.email : ""),
    (data.password = !isEmpty(data.password) ? data.password : "");
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";

  //Email checks
  if (Validator.isEmpty(data.email)) {
    errors.emailEmpty = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.emailInvalid = "Email is invalid";
  }

  //Password check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //Confirm Pasword
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }

  //Password equaluty check
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.passError = "Passwords do not match";
  }

  //Username checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username is required";
  }

  //Name checks
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Full Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
