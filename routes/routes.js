const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
//models
const userSignUp = require("./../models/userSignUp");
const carDetails = require("./../models/carSchema/carDetails");
const ownershipHistory = require("./../models/carSchema/ownershipHistory");
const serviceHistory = require("./../models/carSchema/serviceHistory");
const accidentHistory = require("./../models/carSchema/accidentHistory");
const companyRegistrationTemp = require("./../models/workshopTemp/workshopRegistrationTemp");
const companyRegistration = require("./../models/workshopRegistration");

const adminLogin = require("./../models/adminLogin"); //YET TO BE CREATED

//validation
const carAndOwnerValidate = require("./../validation/addNewCarValidation");
const ownerTransferValidate = require("./../validation/ownerTransferValidation");
const loginValidation = require("./../validation/loginValidation");
const workshopTempValidation = require("./../validation/workshopTempValidation");
const AccidentAndServiceHistoryValidate = require("./../validation/AccidentAndServiceHistoryValidate");
const userSignUpValidate = require("./../validation/userSignUpValidation");

//Routes

//Login for registration auth
router.post("/regLogin", (req, res) => {
  //console.log(req.body);
  //console.log(req.body.typeOfUser);
  const data = req.body;
  const { errors, isValid } = loginValidation(data);
  if (!isValid) {
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    //Log the Reg Auth In
    adminLogin.findOne({ email: data.email }).then((admin) => {
      if (!admin) {
        return res
          .status(400)
          .json({ error: "No User with this email exists!" });
      } else {
        bcrypt.compare(data.password, admin.password, function (err, isMatch) {
          if (err) {
            throw err;
          } else if (!isMatch) {
            return res.status(400).json({ error: "Incorrect Password" });
          } else {
            //JWT Payload
            const payload = {
              id: admin.id,
              name: admin.fullName,
              type: "reg",
            };
            // Sign token
            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 50000,
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          }
        });
      }
    });
  }
});

// Login route for users
router.post("/login", (req, res) => {
  const data = req.body;
  const { errors, isValid } = loginValidation(data);
  if (!isValid) {
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    /*userSignUp.findOne({ email: data.email }).then((user) => {
      //if a user does not exist then
      if (!user) {*/
    companyRegistration
      .findOne({ companyEmail: data.email })
      .then((workshop) => {
        if (!workshop) {
          return res
            .status(400)
            .json({ error: "No User with this email exists!" });
        } else {
          bcrypt.compare(data.password, workshop.companyPassword, function (
            err,
            isMatch
          ) {
            if (err) {
              throw err;
            } else if (!isMatch) {
              return res.status(400).json({ errors: "Incorrect Password" });
            } else {
              //JWT Payload
              const payload = {
                id: workshop.id,
                name: workshop.companyName,
                type: data.typeOfUser,
              };
              // Sign token
              jwt.sign(
                payload,
                "secret",
                {
                  expiresIn: 500000,
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            }
          });
        }
      });

    //if a user exists then
    /*} else {
        bcrypt.compare(data.password, user.password, function (err, isMatch) {
          if (err) {
            throw err;
          } else if (!isMatch) {
            return res.status(400).json({ error: "Incorrect Password" });
          } else {
            //JWT Payload
            const payload = {
              id: user.id,
              name: user.fullName,
            };
            // Sign token
            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 500000,
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          }
        });
      }
    });*/
  }
});

//User sign up
router.post("/signUp", (req, res) => {
  const data = req.body;
  const { errors, isValid } = userSignUpValidate(data);
  if (!isValid) {
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    userSignUp.findOne({ email: data.email }).then((user) => {
      if (user) {
        return res.status(400).json({ error: "This user already exists!" });
      } else {
        //Hash the password and save new user into database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, 10, (err, hash) => {
            if (err) throw err;
            const payload = {
              fullName: data.fullName,
              email: data.email,
              username: data.username,
              password: hash,
            };
            newUser = new userSignUp(payload);
            console.log(newUser);
            newUser.save();
          });
        });
        res.send("Success!");
      }
    });
  }
});

router.get("/getWorkshopsTemp", (req, res) => {
  const data = req.body;
  console.log(data);

  companyRegistrationTemp
    .find({ approved: false }, { companyPassword: 0 })
    .then((workshops) => {
      res.json({ workshops });
    });
});


router.post("/deleteWorkshop", (req,res) => {
  const data = req.body;
  console.log(data);
  console.log("HERE")
  companyRegistrationTemp.deleteOne({companyEmail: data.companyEmail})
  .then(()=>{
    res.json({success: "Workshop deleted from database"})
  })
  .catch(()=>{
    res.status(400).json({
      error: "A database with this Email doesn't exist within the database",
    });
  })
});


router.post("/saveWorkshop", (req, res) => {
  const data = req.body;
  let companyInfo = null;
  companyRegistrationTemp
    .findOne(
      { companyEmail: data.companyEmail },
      { __v: 0, approved: 0, _id: 0 }
    )
    .then((company) => {
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
        companyZip: company.companyZip,
      };
      const newCompanyRegistration = new companyRegistration(companyInfo);
      console.log(newCompanyRegistration);
      companyRegistration
        .findOne({ companyEmail: data.companyEmail })
        .then((company) => {
          if (company) {
            res.status(400).json({
              error: "A database with this Email already exists in Database",
            });
          } else {
            newCompanyRegistration.save((error) => {
              if (error) {
                console.log(error);
                res.status(400).json({ error: "Error saving data" });
              } else {
                companyRegistrationTemp
                  .deleteOne({ companyEmail: data.companyEmail })
                  .then(() => {
                    res.json({
                      sucess: "Company sucessfully approved and saved",
                    });
                  });
              }
            });
          }
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

//Workshop Registration into temporary table
router.post("/workshopSignUp", (req, res) => {
  const data = req.body;
  const { errors, isValid } = workshopTempValidation(data);
  ``;
  if (!isValid) {
    console.log(errors);
    return res.status(400).json({ errors: errors, isValid: isValid });
  } else {
    //console.log(data);

    companyRegistrationTemp
      .findOne({ companyEmail: data.companyEmail })
      .then((company) => {
        if (company) {
          return res
            .status(400)
            .json({ error: "You have already sent a registration email" });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.companyPassword, 10, (err, hash) => {
              if (err) throw err;
              data.companyPassword = hash;
              delete data.companyConfirm;
              const newCompanyRegistrationTemp = new companyRegistrationTemp(
                data
              );
              newCompanyRegistrationTemp.save((error) => {
                if (error) {
                  return res
                    .status(400)
                    .json({ error: "Error saving data to database" });
                } else {
                  return res.json({
                    sucess:
                      "We have recived your application, We will contact you soon",
                  });
                }
              });
            });
          });
        }
      });
  }
});

router.post("/searchCar", (req, res) => {
  const data = req.body;
  console.log(data);
  let returnedCar = null;
  let vin = null;
  let reg = null;
  let serviceDetails = null;
  let ownershipDetails = null;
  let accidentDetails = null;
  let payload = [];

  if (data.selectedOpt === "vin") {
    vin = data.number;
    carDetails.findOne({ vin: data.number }).then((car) => {
      //If car does not exist then
      if (!car) {
        return res.status(400).send("Car does not exist");
      } else {
        returnedCar = car;
        reg = returnedCar.reg;
      }

      ownershipHistory
        .findOne(
          { vin: vin, reg: reg },
          { yearPurchased: 1, millage: 1, city: 1, state: 1 }
        )
        .then((owner) => {
          if (!owner) {
            //return res.status(400).send("Ownership history does not exist");
          } else {
            ownershipDetails = owner;
            //res.json({ owner: ownership, car: returnedCar });
            serviceHistory.find({ vin: vin, reg: reg }).then((car) => {
              if (car) {
                serviceDetails = car;
              } else {
                console.log("Service History does not exist");
              }

              accidentHistory.find({ vin: vin, reg: reg }).then((car) => {
                if (car) {
                  accidentDetails = car;
                  payload = [
                    returnedCar,
                    serviceDetails,
                    ownershipDetails,
                    accidentDetails,
                  ];
                  console.log(payload);
                  return res.json({ car: payload });
                } else {
                  console.log("Accident History does not exist");
                  payload = [
                    returnedCar,
                    serviceDetails,
                    ownershipDetails,
                    accidentDetails,
                  ];
                  console.log(payload);
                  res.json({ car: payload });
                }
              });
            });
          }
          //retrieve data and send back to the client
        });
    });
  }

  if (data.selectedOpt === "reg") {
    reg = data.number;
    carDetails.findOne({ reg: data.number }).then((car) => {
      //If car does not exist then
      if (!car) {
        return res.status(400).send("Car does not exist");
      } else {
        returnedCar = car;
        vin = returnedCar.vin;
      }

      ownershipHistory
        .findOne(
          { reg: data.number, vin: vin },
          { yearPurchased: 1, millage: 1, city: 1, state: 1 }
        )
        .then((owner) => {
          if (!owner) {
            return res.status(400).send("Ownership history does not exist");
          } else {
            ownershipDetails = owner;
            //res.json({ owner: ownership, car: returnedCar });
            serviceHistory.find({ vin: vin, reg: reg }).then((car) => {
              if (car) {
                serviceDetails = car;
                console.log(serviceDetails);
              } else {
                console.log("Service History does not exist");
              }

              accidentHistory.find({ vin: vin, reg: reg }).then((car) => {
                if (car) {
                  accidentDetails = car;
                  payload = [
                    returnedCar,
                    serviceDetails,
                    ownershipDetails,
                    accidentDetails,
                  ];
                  console.log(payload);
                  return res.json({ car: payload });
                } else {
                  console.log("Accident History does not exist");
                  payload = [
                    returnedCar,
                    serviceDetails,
                    ownershipDetails,
                    accidentDetails,
                  ];
                  console.log(payload);
                  return res.json({ car: payload });
                }
              });
            });
          }
          //retrieve data and send back to the client
          //res.json({ owner: ownership, car: returnedCar });
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
