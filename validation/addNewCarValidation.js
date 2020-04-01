const Validator = require("validator");
const isEmpty = require("is-empty");

function validateCarAndOwnerInput(data) {
  let errors = {};

  const date = new Date();

  /*
    vinNumber: this.state.vinNumber,
      regNumber: this.state.regNumber,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      variant: this.state.variant,
      FullName: this.state.FullName,
      ownerCNIC: this.state.ownerCNIC,
      ownerContact: this.state.ownerContact,
      ownerCity: this.state.ownerCity,
      ownerState: this.state.ownerState,
      millage: this.state.millage,
      type: this.state.type,
      fuel: this.state.fuel,
      drive: this.state.drive
      */

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

  //Owner checks
  if (Validator.isEmpty(data.ownerCNIC)) {
    errors.ownerCNICEmpty = "CNIC is required";
  }
  //Owner checks
  if (Validator.isLength(data.ownerCNIC, { min: 13, max: 13 })) {
    errors.ownerCNICLength = "CNIC should be 13 digits";
  }

  if (data.ownerCNIC < 0) {
    errors.ownerCNICNegative = "CNIC cannot be negative";
  }

  //Contact checks
  if (Validator.isEmpty(data.ownerContact)) {
    errors.ownerContactEmpty = "Contact Number is required";
  }
  if (data.ownerContact < 0) {
    errors.ownerContactNegative = "Contact cannot be a negative number";
  }

  //City checks
  if (Validator.isEmpty(data.ownerCity)) {
    errors.ownerCity = "City is required";
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

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateCarAndOwnerInput;
