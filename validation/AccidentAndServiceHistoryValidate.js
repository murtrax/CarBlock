const Validator = require("validator");
const isEmpty = require("is-empty");

function validateAccidentAndServiceData(data) {
  let errors = {};

  //Convert empty fields to an empty string so we can use validator
  //check if empty then convert to empty string else leave as is
  (data.millage = !isEmpty(data.millage) ? data.millage : ""),
    (data.comments = !isEmpty(data.comments) ? data.comments : ""),
    (data.reg = !isEmpty(data.reg) ? data.reg : "");

  //Millage checks
  if (Validator.isEmpty(data.millage)) {
    errors.millageEmpty = "Millage is required";
  }

  //Comments checks
  if (Validator.isEmpty(data.comments)) {
    errors.commentsEmpty = "Comments are required";
  }

  //Reg Number checks
  if (Validator.isEmpty(data.reg)) {
    errors.regEmpty = "Reistration Number is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateAccidentAndServiceData;
