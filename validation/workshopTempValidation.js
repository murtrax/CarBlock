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
  
    else if (data.ownerContact.length > 11)
    {
      errors.ownerContactLength = "Owner Contact should be 11 digits";
    }
  
    
   else if (data.ownerContact < 0) {
    errors.ownerContactNegative = "Owner Contact cannot be negative";
    }  
  //ownerCNIC checks
  if (Validator.isEmpty(data.ownerCNIC)) {
    errors.ownerCNIC = "Owner CNIC is required";
    }

 
    if (data.ownerCNIC.length > 13 || data.ownerCNIC.length < 13) {
      errors.ownerCNICLength = "Owner CNIC should be 13 digits";
    }
  
    
   else if (data.ownerCNIC < 0) {
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


      if (data.companyContact.length <7 || data.companyContact.length <13){
        errors.companyContactLength = "Company Contact Invalid Length";
      }

   else  if (data.companyContact < 0) {
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

    return {
        errors,
        isValid: isEmpty(errors)
      };
}

module.exports = workshopTempValidation;