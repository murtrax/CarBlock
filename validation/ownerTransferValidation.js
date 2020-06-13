const Validator = require("validator");
const isEmpty = require("is-empty");

function ownerTransferValidate(data) {
  let errors = {};

  const date = new Date();
  year = data.year 
  year = year.toString()

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

  else if (!Validator.isAlpha(data.name)) {
    errors.nameAlpha = "Full Name can only contain alphabets"
  }

  //CNIC checks
  if (Validator.isEmpty(data.cnic)) {
    errors.cnicEmpty = "CNIC is required";
  }

  /*if (Validator.isLength(data.cnic, { min: 13, max: 13 })) {
    errors.cnicLength = "CNIC should be 13 digits";
  }*/

  else if (data.cnic.length != 13 ) {
    errors.cnicLength = "CNIC should be 13 digits";
  }

  else if (data.cnic.length < 0) {
    errors.cnicNegative = "CNIC cannot be negative";
  }



  //Contact checks
  if (Validator.isEmpty(data.contact)) {
    errors.contactEmpty = "Contact Number is required";
  }
  else if (data.contact < 0) {
    errors.contactNegative = "Contact cannot be a negative number";
  }

  else if (data.contact.length < 7) {
    errors.contactLength = "Contact needs to be seven digits or greater";
  }

  //City checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City is required";
  }

  else if (!Validator.isAlpha(data.city)) {
    errors.cityAlpha = "City Name can only contain alphabets"
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

  /*   GET OLD Millage and compared with the new one, make sure not less   */
  if (data.millage < 0) {
    errors.millageNegative = "Millage cannot be a negative number";
  }

  //Year checks
  if (Validator.isEmpty(year)) {
    
    errors.YearsEmpty = "Year is required";
  }

  if (data.year > date.getFullYear()) {
    errors.YearsInvalid = "Year not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = ownerTransferValidate;
