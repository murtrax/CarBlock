const Validator = require("validator");
const isEmpty = require("is-empty");

function validateCarAndOwnerInput(data) {
  let errors = {};

  const date = new Date();

  //Convert empty fields to an empty string so we can use validator
  //check if empty then convert to empty string else leave as is
  (data.vinNumber = !isEmpty(data.vinNumber) ? data.vinNumber : ""),
    (data.regNumber = !isEmpty(data.regNumber) ? data.regNumber : ""),
    (data.make = !isEmpty(data.make) ? data.make : ""),
    (data.model = !isEmpty(data.model) ? data.model : ""),
    (data.year = !isEmpty(data.year) ? data.year : ""),
    (data.variant = !isEmpty(data.variant) ? data.variant : ""),
    (data.FullName = !isEmpty(data.FullName) ? data.FullName : ""),
    (data.ownerCNIC = !isEmpty(data.ownerCNIC) ? data.ownerCNIC : ""),
    (data.ownerContact = !isEmpty(data.ownerContact) ? data.ownerContact : ""),
    (data.ownerCity = !isEmpty(data.ownerCity) ? data.ownerCity : ""),
    (data.ownerState = !isEmpty(data.ownerState) ? data.ownerState : ""),
    (data.millage = !isEmpty(data.millage) ? data.millage : ""),
    (data.type = !isEmpty(data.type) ? data.type : ""),
    (data.fuel = !isEmpty(data.fuel) ? data.fuel : ""),
    (data.drive = !isEmpty(data.drive) ? data.drive : "");

  /** CAR DETAILS VALIDATION */

  //Vin Number checks
  if (Validator.isEmpty(data.vinNumber)) {
    errors.vinNumber = "Vin Number field is required";
  }

  //Reg Number checks
  if (Validator.isEmpty(data.regNumber)) {
    errors.regNumber = "Registration Number is required";
  }

  //Make checks
  if (Validator.isEmpty(data.make)) {
    errors.make = "Make is required";
  }



  //Model checks
  if (Validator.isEmpty(data.model)) {
    errors.model = "Model is required";
  }

  //Year checks
  if (Validator.isEmpty(data.year)) {
    errors.YearsEmpty = "Year is required";
  }

  if (data.year > date.getFullYear() + 1) {
    errors.YearsInvalid = "Year not valid";
  }

  //Type checks
  if (Validator.isEmpty(data.type)) {
    errors.type = "Type is required";
  }

  //Fuel checks
  if (Validator.isEmpty(data.fuel)) {
    errors.fuel = "Fuel type is required";
  }

  //Drive checks
  if (Validator.isEmpty(data.drive)) {
    errors.drive = "Drive type is required";
  }

  /** OWNER DETAILS VALIDATION */

  //Full Name checks
  if (Validator.isEmpty(data.FullName)) {
    errors.FullName = "Full Name is required";
  }

  else if (!Validator.isAlpha(data.FullName)) {
    errors.FullNameAlpha = "Full name can only contain alphabets"
  }

  //Owner checks
  if (Validator.isEmpty(data.ownerCNIC)) {
    errors.ownerCNICEmpty = "CNIC is required";
  }
  //Owner checks
  /*if (Validator.isLength(data.ownerCNIC, { min: 12, max: 12 })) {
    
    errors.ownerCNICLength = "CNIC should be 13 digits";
  }*/

  else if (data.ownerCNIC.length != 13 ) {
    errors.ownerCNICLength = "CNIC should be 13 digits";
  }

  else if (data.ownerCNIC.length < 0) {
    errors.ownerCNICNegative = "CNIC cannot be negative";
  }

  //Contact checks
  if (Validator.isEmpty(data.ownerContact)) {
    errors.ownerContactEmpty = "Contact Number is required";
  }
  else if (data.ownerContact < 0) {
    errors.ownerContactNegative = "Contact cannot be a negative number";
  }

 else if (data.ownerContact.length < 7) {
    errors.ownerContactLength = "Contact needs to be seven digits or greater";
  }

  //City checks
  if (Validator.isEmpty(data.ownerCity)) {
    errors.ownerCity = "City is required";
  }

  else if (!Validator.isAlpha(data.ownerCity)) {
    errors.ownerCityAlpha = "City Name can only contain alphabets"
  }

  //State checks
  if (Validator.isEmpty(data.ownerState)) {
    errors.ownerState = "State is required";
  }

  else if (!Validator.isAlpha(data.ownerState)) {
    errors.ownerStateAlpha = "State can only contain alphabets"
  }

  //Millage checks
  if (Validator.isEmpty(data.millage)) {
    errors.millageEmpty = "Millage is required";
  }

  if (data.millage < 0) {
    errors.millageNegative = "Millage cannot be a negative number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateCarAndOwnerInput;
