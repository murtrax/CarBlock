const Validator = require("validator");
const isEmpty = require("is-empty");

function workshopTempValidation(data) {
    let errors = {};

    //ownerName checks
  if (Validator.isEmpty(data.ownerName)) {
    errors.ownerName = "Owner Name is required";
  }

  //ownerPosition checks
  if (Validator.isEmpty(data.ownerPosition)) {
    errors.ownerPosition = "Owner Postion is required";
  }

  //ownerContact checks
  if (Validator.isEmpty(data.ownerContact)) {
    errors.ownerContact = "Owner Position is required";
  }
  if (Validator.isLength(data.ownerContact, { min: 11, max: 11 })) {
    errors.ownerContactLength = "Owner Contact should be 11 digits";
    }
    
   if (data.ownerContact < 0) {
    errors.ownerContactNegative = "Owner Contact cannot be negative";
    }  
  //ownerCNIC checks
  if (Validator.isEmpty(data.ownerCNIC)) {
    errors.ownerCNIC = "Owner CNIC is required";
    }

  if (Validator.isLength(data.ownerCNIC, { min: 13, max: 13 })) {
    errors.ownerCNICLength = "Owner CNIC should be 13 digits";
    }
    
   if (data.ownerCNIC < 0) {
    errors.ownerCNICNegative = "Owner CNIC cannot be negative";
    }  

  //companyName checks
  if (Validator.isEmpty(data.companyName)) {
    errors.companyName = "Company Name is required";
  }
  //companyEmail checks
  if (Validator.isEmpty(data.companyEmail)) {
    errors.companyEmail = "Company Email is required";
    }
   //companyPassword checks
   if (Validator.isEmpty(data.companyPassword)) {
    errors.companyPassword = "Company Password is required";
    }
     //companyConfirm checks
  if (Validator.isEmpty(data.companyConfirm)) {
    errors.companyConfirm = "Company Password Confirmed is required";
    }
     //companyEmail checks
  if (Validator.isEmpty(data.companyContact)) {
    errors.companyContact = "Company Contact is required";
    }

    if (Validator.isLength(data.companyContact, { min: 11, max: 11 })) {
    errors.companyContactLength = "Company Contact should be 11 digits";
    }

    if (data.companyContact < 0) {
        errors.companyContactNegative = "CompanyContact cannot be a negative number";
      } 

     //companyAddress checks
  if (Validator.isEmpty(data.companyAddress)) {
    errors.companyAddress = "Company Address is required";
    }
     //companyCity checks
  if (Validator.isEmpty(data.companyCity)) {
    errors.companyCity = "Company City is required";
    }
     //companyZip checks
  if (Validator.isEmpty(data.companyZip)) {
    errors.companyZip = "Company ZIP Code is required";
    }

  if (data.companyZip < 0) {
    errors.companyZipNegative = "Company Zip Code cannot be a negative number";
  }   

    
     //passError checks
  if (Validator.isEmpty(data.passError)) {
    errors.passError = "Pass Error is required is required";
    }  
    return {
        errors,
        isValid: isEmpty(errors)
      };
}

module.exports = workshopTempValidation;