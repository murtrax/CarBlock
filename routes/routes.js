const express = require("express");

const router = express.Router();
const userSignUp = require("./../models/userSignUp");
const carDetails = require("./../models/carSchema/carDetails");
const ownershipHistory = require("./../models/carSchema/ownershipHistory");
const serviceHistory = require("./../models/carSchema/serviceHistory");
const accidentHistory = require("./../models/carSchema/accidentHistory");
const companyRegistrationTemp = require("./../models/workshopTemp/workshopRegistrationTemp");
const companyRegistration = require ("./../models/workshopRegistration");
const carAndOwnerValidate = require("./../validation/addNewCarValidation");
const ownerTransferValidate = require("./../validation/ownerTransferValidation");
const loginValidation = require("./../validation/loginValidation");
const workshopTempValidation = require("./../validation/workshopTempValidation");
const AccidentAndServiceHistoryValidate = require("./../validation/AccidentAndServiceHistoryValidate");

//./../client/src/components/homeComponents/carResults.js

/** ROUTES */

//a post require to handle user sign up
router.post("/userSignUp", (req, res) => {
  const data = req.body;
  //CHECK FOR DUPLICATE EMAIL
  //
  /*const newUser = new userSignUp(data);
  newUser.save(error => {
    if (!error) {
      res.json("save successfull!");
    } else {
      res.json("error occurred in saving!");
    }
  });*/
  console.log(data);
  res.json(data);
});

//a get request to handle  signup
router.post("/signUp", (req, res) => {
  const data = req.body;
  const { errors, isValid } = loginValidation(data);
  if (!isValid) {
    console.log(errors);
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    res.json({ success: "You are logged in" });
  }
  /* NEED TO IMPLEMENT USER LOGIN DETS */

  /*login.find({email: data.email, password: data.password})
  .then({

  })*/
});

router.get("/getWorkshopsTemp", (req,res)=> {
  const data = req.body;
  console.log(data)

  companyRegistrationTemp.find({approved: false, }, {companyPassword: 0}).then( workshops => {
    res.json({workshops})
  })

})

router.post("/saveWorkshop", (req,res)=> {
  const data = req.body;
  let companyInfo = null;
  companyRegistrationTemp.findOne({companyEmail: data.companyEmail}, {__v: 0, approved: 0, _id: 0})
  .then(company=> {
    companyInfo = {
      ownerName: company.ownerName,
      ownerPosition: company.ownerPosition,
      ownerContact: company.ownerContact,
      ownerCNIC: company.ownerCNIC,
      companyName: company.companyName,
      companyEmail: company.companyEmail,
      companyPassword: company.companyPassword,
      companyContact: company.companyContact,
      companyAddress: company.companyAddress,
      companyCity: company.companyCity,
      companyZip: company.companyZip
    }
    const newCompanyRegistration = new companyRegistration(companyInfo);
    console.log(newCompanyRegistration)
    companyRegistration.findOne({companyEmail: data.companyEmail})
    .then(company=> {
      if (company) {
        res.status(400).json({error: "A database with this Email already exists in Database"})
      }
      else {
        newCompanyRegistration.save(error=> {
          if (error) { 
            console.log(error);
            res.status(400).json({error: "Error saving data"})
          }
          else {
            companyRegistrationTemp.deleteOne({ companyEmail: data.companyEmail})
            .then(()=> {
                res.json({sucess: "Company sucessfully approved and saved"})
              })
            }
        })
      }
    })

  })
  .catch(error=> {
    console.log(error)
  })



})
//a get request to handle WORKSHOP REG
router.post("/workshopSignUp", (req, res) => {
  const data = req.body;
  const { errors, isValid } = workshopTempValidation(data);
  if (!isValid) {
    console.log(errors);
<<<<<<< HEAD
    return res.status(400).json({errors: errors, isValid: isValid});
  }
  else {
    console.log(data);
    const newCompanyRegistrationTemp = new companyRegistrationTemp(data)

    companyRegistrationTemp.findOne({companyEmail: data.companyEmail})
    .then(company=> {
      if (company)
      {
        return res.status(400).json({error: "You have already sent a registration email"})
      }

      else {
        newCompanyRegistrationTemp.save(error=> {
          if (error) {
            return res.status(400).json({error: "Error saving data to database"})
          }
          else {
            return res.json({sucess: "We have recived your application, We will contact you soon"})
          }
        })
      }
    })
  }
=======
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    res.json({ success: "We will contact you soon!!!" });
  }
  /* NEED TO IMPLEMENT USER LOGIN DETS */

  /*login.find({email: data.email, password: data.password})
  .then({

  })*/
>>>>>>> Hassaan
});

router.post("/searchCar", (req, res) => {
  const data = req.body;
  //console.log(data);
  let returnedCar = null;
  let ownership = null;

  if (data.selectedOpt === "vin") {
    carDetails.findOne({ vin: data.number }).then((car) => {
      //If car does not exist then
      if (!car) {
        return res.status(400).send("Car does not exist");
      } else {
        returnedCar = car;
      }

      ownershipHistory
        .findOne(
          { vin: data.number },
          { yearPurchased: 1, millage: 1, city: 1, state: 1 }
        )
        .then((owner) => {
          if (!owner) {
            return res.status(400).send("Ownership history does not exist");
          } else {
            ownership = owner;
            res.json({ owner: ownership, car: returnedCar });
          }
          //retrieve data and send back to the client
        });
    });
  }

  if (data.selectedOpt === "reg") {
    carDetails.findOne({ reg: data.number }).then((car) => {
      //If car does not exist then
      if (!car) {
        return res.status(400).send("Car does not exist");
      } else {
        returnedCar = car;
      }

      ownershipHistory
        .findOne(
          { reg: data.number },
          { yearPurchased: 1, millage: 1, city: 1, state: 1 }
        )
        .then((owner) => {
          if (!owner) {
            return res.status(400).send("Ownership history does not exist");
          } else {
            ownership = owner;
          }
          //retrieve data and send back to the client
          res.json({ owner: ownership, car: returnedCar });
        });
    });
  }
});

router.post("/CarEntry", (req, res) => {
  const data = req.body;
  const { errors, isValid } = carAndOwnerValidate(data);
  if (!isValid) {
    console.log(errors);
    return res.status(400).json({ errors: errors, isValid: isValid });
  }

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    carDetails
      .findOne({ $or: [{ reg: data.regNumber }, { vin: data.vinNumber }] })
      .then((car) => {
        if (car) {
          return res
            .status(400)
            .send("A vehicle with this VIN or Reg Number already exists");
        } else {
          const carData = {
            vin: data.vinNumber,
            reg: data.regNumber,
            make: data.make,
            model: data.model,
            year: data.year,
            varaint: data.variant,
            type: data.type,
            fuel: data.fuel,
            drive: data.drive,
          };
          const ownerData = {
            vin: data.vinNumber,
            reg: data.regNumber,
            yearPurchased: data.year,
            millage: data.millage,
            city: data.ownerCity,
            state: data.ownerState,
            ownerName: data.FullName,
            ownerCNIC: data.ownerCNIC,
            ownerContact: data.ownerContact,
          };
          const newCarDetails = new carDetails(carData);
          const newOwner = new ownershipHistory(ownerData);
          newCarDetails.save((error) => {
            if (error) {
              return res
                .status(400)
                .json({ error: "There was an error saving Car Details" });
            }
          });
          newOwner.save((error) => {
            if (error) {
              return res
                .status(400)
                .json({ error: "There was an error saving new Owner details" });
            }
          });
          res.send("The new car entry was sucessfully saved");
        }
      });
  }
});

router.post("/OwnerTransfer", (req, res) => {
  const data = req.body;

  const { errors, isValid } = ownerTransferValidate(data);
  if (!isValid) {
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    //save in db
    console.log(data);
    res.json(data);
  }
});

router.post("/AccidentAndService", (req, res) => {
  const data = req.body; //Extract data from body
  const { errors, isValid } = AccidentAndServiceHistoryValidate(data); //Validate data
  if (!isValid) {
    return res.status(400).json({ errors: errors, isValid: isValid }); //Send error response to client with errors object
  } else {
    const todaysDate = Date.now(); //todays date
    carDetails
      .findOne({ reg: data.reg }, { vin: 1 })
      .then((car) => {
        const payload = {
          vin: car.vin,
          reg: data.reg,
          millage: data.millage,
          date: todaysDate,
          comments: data.comments,
        };

        if (data.activeItem == "1") {
          const serviceDetails = new serviceHistory(payload);
          serviceDetails.save((error) => {
            if (error) {
              res.status(400).json({ error: "error in saving!" });
            } else {
              res.send("Saved in service history successfully!");
            }
          });
        } else {
          const accidentDetails = new accidentHistory(payload);
          accidentDetails.save((error) => {
            if (error) {
              res.status(400).json({ error: "error in saving!" });
            } else {
              res.send("Saved in accident history successfully!");
            }
          });
        }
      })
      .catch((error) =>
        res
          .status(400)
          .json({ error: "No Car Found across this Registration Number!" })
      );
  }
});

module.exports = router;
