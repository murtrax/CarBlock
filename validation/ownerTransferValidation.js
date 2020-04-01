const Validator = require("validator");
const isEmpty = require("is-empty");

function ownerTransferValidate(data) {
  let errors = {};

  const date = new Date();

  //Vin Number checks
  if (Validator.isEmpty(data.vinNumber)) {
    errors.vinNumber = "Vin Number is required";
  }

  //Reg Number checks
  if (Validator.isEmpty(data.regNumber)) {
    errors.regNumber = "Registration Number is required";
  }

  //Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Full Name is required";
  }

  //CNIC checks
  if (Validator.isEmpty(data.cnic)) {
    errors.cnicEmpty = "CNIC is required";
  }

  if (Validator.isLength(data.cnic, { min: 13, max: 13 })) {
    errors.cnicLength = "CNIC should be 13 digits";
  }

  if (data.cnic < 0) {
    errors.cnicNegative = "CNIC cannot be negative";
  }

  //Contact checks
  if (Validator.isEmpty(data.contact)) {
    errors.contactEmpty = "Contact Number is required";
  }
  if (data.contact < 0) {
    errors.contactNegative = "Contact cannot be a negative number";
  }

  //City checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City is required";
  }

  //State checks
  if (Validator.isEmpty(data.ownerState)) {
    errors.ownerState = "State is required";
  }

  //Millage checks
  if (Validator.isEmpty(data.millage)) {
    errors.millageEmpty = "Millage is required";
  }

  if (data.millage < 0) {
    errors.millageNegative = "Millage cannot be a negative number";
  }

  //Year checks
  if (Validator.isEmpty(data.year)) {
    errors.YearsEmpty = "Year is required";
  }

  if (data.year > date.getFullYear() + 1) {
    errors.YearsInvalid = "Year not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = ownerTransferValidate;
