const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const web3 = require("web3");
const router = express.Router();

//models
const userSignUp = require("./../models/userSignUp");
const carDetails = require("./../models/carSchema/carDetails");
const ownershipHistory = require("./../models/carSchema/ownershipHistory");
const serviceHistory = require("./../models/carSchema/serviceHistory");
const accidentHistory = require("./../models/carSchema/accidentHistory");
const companyRegistrationTemp = require("./../models/workshopTemp/workshopRegistrationTemp");
const companyRegistration = require("./../models/workshopRegistration");
const informationHash = require("./../models/informationHash");
const sparePart = require("./../models/carSchema/sparePart");
const adminLogin = require("./../models/adminLogin"); //YET TO BE CREATED

//validation
const carAndOwnerValidate = require("./../validation/addNewCarValidation");
const ownerTransferValidate = require("./../validation/ownerTransferValidation");
const loginValidation = require("./../validation/loginValidation");
const workshopTempValidation = require("./../validation/workshopTempValidation");
const AccidentAndServiceHistoryValidate = require("./../validation/AccidentAndServiceHistoryValidate");
const userSignUpValidate = require("./../validation/userSignUpValidation");
const hash = require("object-hash");

//hashing or conversion
const carDataHashing = require("../hashingAndConversion/carDataHashing");
const ownerDataHashing = require("../hashingAndConversion/ownerDataHashing");
const serviceDataHashing = require("./../hashingAndConversion/serviceDataHashing");
const addToOwnerHistory = require("./../hashingAndConversion/addtoOwnerHistory");
const accidentDataHashing = require("./../hashingAndConversion/accidentDataHashing");

/******************
 * SMART CONTRACT CONFIGURATION
 */
const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "carDetailsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ownerDetailsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "serviceDetailsHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "accidentDetailsHash",
        type: "string",
      },
    ],
    name: "Transferred",
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_carDetailsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ownerDetailsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_serviceDetailsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_accidentDetailsHash",
        type: "string",
      },
    ],
    name: "eventGenerator",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = "0xC845e757c1b7e226EE85130bfCC178d13d4228F2";
const web3js = new web3();
web3js.setProvider(new web3.providers.HttpProvider("http://localhost:9545"));
const hashingTestSC = new web3js.eth.Contract(contractAbi, contractAddress);

let accounts = [];

web3js.eth.getAccounts().then((_accounts) => {
  accounts = _accounts;
});

/******************** */

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

//save workshop into permanent table
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

/**
 * This route takes input from the workshop registration form,
 * validates the data for proper format, and saves the record in a
 * temporary table for workshops for reg auth approval
 */
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
                    success:
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

/**
 * This route retrieves a list of all un-approved workshops in the table
 * and sends that data to the front-end (registration auth dashboard)
 */
router.get("/getWorkshopsTemp", (req, res) => {
  const data = req.body;

  companyRegistrationTemp
    .find({ approved: false }, { companyPassword: 0 })
    .then((workshops) => {
      res.json({ workshops });
    });
});

/**
 * This route takes an email as an input in the request
 * and deletes any workshops with the corresponding email
 * in the temporary workshop holder table.
 * If workshop doesn't exist, appropriate msg is sent back
 */
router.post("/deleteWorkshop", (req, res) => {
  const data = req.body;
  companyRegistrationTemp
    .deleteOne({ companyEmail: data.companyEmail })
    .then(() => {
      res.json({ success: "Workshop deleted from database" });
    })
    .catch(() => {
      res.status(400).json({
        error: "A workshop with this Email doesn't exist within the database",
      });
    });
});

/**
 * This route takes input as a number from the search bar (landing page) and checks if it is vin or reg num
 * according to the selection, appropriate car is retrieved and hash of all 4 types of data is calculated
 * 4 hashes are matched with the hashes stored in the BC and if matched then data is sent to the front end
 * else it is not and error is logged saying that data mismatch
 */
router.post("/searchCar", (req, res) => {
  //Extract form data from request
  const data = req.body;

  //Initialize null variables
  let vin = null;
  let reg = null;
  let serviceDetails = [];
  let accidentDetails = [];

  //Initialize empty payload
  let payload = [];

  if (data.selectedOpt === "vin") {
    vin = data.number;
    carDetails.findOne({ vin: data.number }).then((car) => {
      //If car does not exist then
      if (!car) {
        return res
          .status(400)
          .send("There is nor registered vehicle across this Vin number!");
      } else {
        //Get Hash of car data after converting into valid object
        const cHash = carDataHashing(car);
        const returnedCar = car;
        //Get registration number of car (for handling queries)
        reg = returnedCar.reg;

        //Get ownership details about said car
        ownershipHistory
          .find(
            { vin: vin, reg: reg }
            /*{ yearPurchased: 1, millage: 1, city: 1, state: 1 }*/
          )
          .then((owner) => {
            if (!owner) {
              return res
                .status(400)
                .send("Ownership history does not exist! Data corrupt!");
            } else {
              //Get hashed data of owner details across said car
              //console.log("owner retreived from db: " + owner);
              const oHash = ownerDataHashing(owner);
              console.log("oHash aftre db retrieval: " + oHash);
              //owner object returned from DB
              const ownershipDetails = owner;
              //Find service history across said car
              serviceHistory.find({ vin: vin, reg: reg }).then((sHistory) => {
                let sHash = null;
                if (sHistory) {
                  //Get hash of service details of said car
                  sHash = serviceDataHashing(sHistory);
                  //service details of car
                  serviceDetails = sHistory;
                } else {
                  console.log(
                    "No records against service history for this vehicle exist!"
                  );
                  sHash = hash([]);
                }

                //Find accident history for said vehicle
                accidentHistory
                  .find({ vin: vin, reg: reg })
                  .then(async (aHistory) => {
                    let aHash = null;
                    if (aHistory) {
                      //Get hash of accident data
                      aHash = accidentDataHashing(aHistory);
                      //accident records of car
                      accidentDetails = aHistory;
                    } else {
                      console.log(
                        "No records against accident history for this vehicle exist!"
                      );
                      aHash = hash([]);
                    }

                    //Check if existing data is correct with the blockchain hashes
                    await compareExistingRecords(
                      vin,
                      reg,
                      cHash,
                      oHash,
                      sHash,
                      aHash
                    )
                      .then((bool) => {
                        if (bool) {
                          //If hashes match and data is ok then make payload
                          payload = [
                            returnedCar,
                            serviceDetails,
                            ownershipDetails,
                            accidentDetails,
                          ];
                          //send the payload to the frontend
                          return res.json({ car: payload });
                        }
                      })
                      .catch((err) => {
                        res.status(400).json({
                          msg:
                            "The existing records in the database are not valid! We apologise for the inconvenience! ",
                          typeMismatch: err.message,
                        });
                      });
                  }); //end then block for accident history
              }); //end then block for service history
            }
          }); //end then block for owner history
      }
    });
  }

  if (data.selectedOpt === "reg") {
    reg = data.number;
    carDetails.findOne({ reg: data.number }).then((car) => {
      //If car does not exist then
      if (!car) {
        return res
          .status(400)
          .send(
            "There is no registered vehicle across this Registration number!"
          );
      } else {
        //Get Hash of car data after converting into valid object
        const cHash = carDataHashing(car);
        const returnedCar = car;
        //Get registration number of car (for handling queries)
        vin = returnedCar.vin;

        //Get ownership details about said car
        ownershipHistory
          .find(
            { vin: vin, reg: reg }
            /*{ yearPurchased: 1, millage: 1, city: 1, state: 1 }*/
          )
          .then((owner) => {
            if (!owner) {
              return res
                .status(400)
                .send("Ownership history does not exist! Data corrupt!");
            } else {
              //Get hashed data of owner details across said car
              const oHash = ownerDataHashing(owner);

              //owner object returned from DB
              const ownershipDetails = owner;
              //Find service history across said car
              serviceHistory.find({ vin: vin, reg: reg }).then((sHistory) => {
                let sHash = null;
                if (sHistory) {
                  //Get hash of service details of said car
                  sHash = serviceDataHashing(sHistory);
                  //service details of car
                  serviceDetails = sHistory;
                } else {
                  console.log(
                    "No records against service history for this vehicle exist!"
                  );
                  sHash = hash([]);
                }

                //Find accident history for said vehicle
                accidentHistory
                  .find({ vin: vin, reg: reg })
                  .then(async (aHistory) => {
                    let aHash = null;
                    if (aHistory) {
                      //Get hash of accident data
                      aHash = accidentDataHashing(aHistory);
                      //accident records of car
                      accidentDetails = aHistory;
                    } else {
                      console.log(
                        "No records against accident history for this vehicle exist!"
                      );
                      aHash = hash([]);
                    }

                    //Check if existing data is correct with the blockchain hashes
                    await compareExistingRecords(
                      vin,
                      reg,
                      cHash,
                      oHash,
                      sHash,
                      aHash
                    )
                      .then((bool) => {
                        if (bool) {
                          //If hashes match and data is ok then make payload
                          payload = [
                            returnedCar,
                            serviceDetails,
                            ownershipDetails,
                            accidentDetails,
                          ];
                          //send the payload to the frontend
                          return res.json({ car: payload });
                        }
                      })
                      .catch((err) => {
                        res.status(400).json({
                          msg:
                            "The existing records in the database are not valid! We apologise for the inconvenience! --- " +
                            err.message,
                        });
                      });
                  }); //end then block for accident history
              }); //end then block for service history
            }
          }); //end then block for owner history
      }
    });
  }
});

/**
 * This route takes input from the ADD-NEW-CAR form and saves that information into two tables.
 * Car details are saved in car details table and owner details in their own table.
 * Smart Contract saves hashes of all 4 types of car data
 * Block Number of transaction/data is saved in information hashes table
 */
router.post("/CarEntry", (req, res) => {
  const data = req.body;
  //Validate proper format of data
  const { errors, isValid } = carAndOwnerValidate(data);
  //if data is not valid, send errors back to front end
  if (!isValid) {
    return res.status(305).json({ errors: errors, isValid: isValid });
  } else {
    //if data is in proper valid format than check if a car with this vin and reg# already exists in the db
    carDetails
      .findOne({ $or: [{ reg: data.regNumber }, { vin: data.vinNumber }] })
      .then((car) => {
        //if car exists send error message
        if (car) {
          return res.status(400).json({
            error: "A vehile with this VIN or Reg Number already exists",
          });
        } else {
          //Object of car details
          const carData = {
            vin: data.vinNumber,
            reg: data.regNumber,
            make: data.make,
            model: data.model,
            year: data.year.toString(),
            varaint: data.variant,
            type: data.type,
            fuel: data.fuel,
            drive: data.drive,
          };

          //Object of owner details
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
            date: Date.now().toString(),
          };

          //Hash of all 4 types of car data ready to be passed into SC
          const carDataHashed = carDataHashing(carData);
          const ownerDataHashed = ownerDataHashing(ownerData);
          const serviceDataHashed = hash([]);
          const accidentDataHashed = hash([]);

          //Call SC with this data
          hashingTestSC.methods
            .eventGenerator(
              carDataHashed,
              ownerDataHashed,
              serviceDataHashed,
              accidentDataHashed
            )
            .send({ from: accounts[0], gas: 3000000 })
            .then((response) => {
              //After receiving transaction reciept back, save the blockNumber of transaction in info hashes table
              const blockNumberInfoForDb = {
                vin: data.vinNumber,
                reg: data.regNumber,
                block: response.events.Transferred.blockNumber,
              };
              const newInformationHash = new informationHash(
                blockNumberInfoForDb
              );
              newInformationHash.save((error) => {
                if (error) {
                  return res.status(400).json({
                    error: "There was an error saving Block Number!",
                  });
                }
              });

              //Save car and owner details into their respective tables
              const newCarDetails = new carDetails(carData);
              const newOwner = new ownershipHistory(ownerData);

              //Save car details
              newCarDetails.save((error) => {
                if (error) {
                  return res
                    .status(400)
                    .json({ error: "There was an error saving Car Details" });
                }
              });

              //Save owner details
              newOwner.save((error) => {
                if (error) {
                  return res.status(400).json({
                    error: "There was an error saving new Owner details",
                  });
                }
              });

              res.send("The new car entry was sucessfully saved");
            }) //end then block of SC
            .catch((err) => console.log(err));
        } //end else
      }); // end then block of car details
  } //end else of validity
}); //end route

/**
 * This method transfer ownership of a vehicle to another individual
 * All 4 types of data hashes are computed and stored into a smart contract again
 * Block Number of updated transaction is stored in info hashes table as an updated record
 */
router.post("/OwnerTransfer", (req, res) => {
  const data = req.body;
  //check for valid data format and errors
  const { errors, isValid } = ownerTransferValidate(data);
  //if data is not valid, send error message to front end
  if (!isValid) {
    return res.status(305).json({ errors: errors, isValid: isValid });
  } else {
    //find if this car exists in the database
    carDetails
      .findOne({ vin: data.vinNumber, reg: data.regNumber })
      .then((car) => {
        //if car exists then retrieve its owner details
        if (car) {
          ownershipHistory
            .find({ vin: data.vinNumber, reg: data.regNumber })
            .then((response) => {
              //if owner data exists in the db
              if (response) {
                //make data object for new owner
                const newOwnerData = {
                  vin: data.vinNumber,
                  reg: data.regNumber,
                  yearPurchased: data.year,
                  millage: data.millage,
                  city: data.city,
                  state: data.ownerState,
                  ownerName: data.name,
                  ownerCNIC: data.cnic,
                  ownerContact: data.contact,
                  date: Date.now().toString(),
                };
                //Use this value to compare values in the BC before updating
                const ownerHashToCompare = ownerDataHashing(newOwnerData);

                //add new record to the object
                response.push(newOwnerData);

                //Hashed car object
                const carDataHashed = carDataHashing(car);
                //Hash updated owner data
                const ownerDataHashed = ownerDataHashing(response);

                //search service history for car
                serviceHistory
                  .find({ vin: data.vinNumber, reg: data.regNumber })
                  .then((service) => {
                    let serviceDataHashed = null;
                    //if service records exist then calculate their hash else find hash of empty array
                    if (service) {
                      serviceDataHashed = serviceDataHashing(service);
                    } else {
                      serviceDataHashed = hash([]);
                    }
                    //search accident history for car
                    accidentHistory
                      .find({ vin: data.vinNumber, reg: data.regNumber })
                      .then(async (accident) => {
                        let accidentDataHashed = null;
                        //if accident records exist then calculate their hash else find hash of empty array
                        if (accident) {
                          accidentDataHashed = accidentDataHashing(accident);
                        } else {
                          accidentDataHashed = hash([]);
                        }

                        //Compare hashes of existing records before starting  a new transaction and updating values
                        await compareExistingRecords(
                          data.vinNumber,
                          data.regNumber,
                          carDataHashed,
                          ownerHashToCompare,
                          serviceDataHashed,
                          accidentDataHashed
                        )
                          .then((bool) => {
                            if (bool) {
                              //Call smart contract with hashed data to store in event
                              hashingTestSC.methods
                                .eventGenerator(
                                  carDataHashed,
                                  ownerDataHashed,
                                  serviceDataHashed,
                                  accidentDataHashed
                                )
                                .send({ from: accounts[0], gas: 3000000 })
                                .then((response) => {
                                  //Check if a record across this car already exists
                                  informationHash
                                    .findOne({
                                      vin: data.vinNumber,
                                      reg: data.regNumber,
                                    })
                                    .then((record) => {
                                      //if record exists update it else create new record
                                      updateOrCreateEntryInHashTable(
                                        record,
                                        response,
                                        data.vinNumber,
                                        data.regNumber
                                      );
                                      console.log("Transaction Completed!");

                                      //save new owner into db
                                      const OwnerTransfer = new ownershipHistory(
                                        newOwnerData
                                      );
                                      OwnerTransfer.save();
                                      res.send(
                                        "Owner Transferred Successfully!"
                                      );
                                    });
                                });
                            }
                          })
                          .catch((err) => {
                            res.status(400).json({
                              msg:
                                "The existing records in the database are not valid! We apologise for the inconvenience! --- " +
                                err.message,
                            });
                          });
                      });
                  });
              } else {
                //if owner dasta doesnt exist in database
                res.status(400).json({
                  error: "Data corrupt! No owner for this car exists!",
                });
              }
            });
        } else {
          //if car does not exists then return error msg
          res.status(400).json({
            error: "No such car exists in the database!",
          });
        }
      }) // end then block of car details
      .catch((err) => {
        console.log("Error fetching car from DB!");
      });
  } //end else of validity
});

/**
 * This route adds a record to accident and service history depending on selected option
 * All 4 types of data hashes are computed again and stored into blockchain smart contract
 * BlockNumber updated in info hashes table
 */
router.post("/AccidentAndService", (req, res) => {
  const data = req.body; //Extract data from body
  console.log(data);
  const { errors, isValid } = AccidentAndServiceHistoryValidate(data); //Validate data
  //if data is not valid then send errors to front end
  if (!isValid) {
    return res.status(305).json({ errors: errors, isValid: isValid }); //Send error response to client with errors object
  } else {
    //todays date
    const todaysDate = Date.now().toString();

    //search car details for coressponding car
    carDetails
      .findOne({ reg: data.reg } /*, { vin: 1 }*/)
      .then((car) => {
        //create hash of car data
        const carDataHashed = carDataHashing(car);
        //search owner details of the car
        ownershipHistory
          .find({ vin: car.vin, reg: car.reg })
          .then((owner) => {
            //create hash of owner data
            const ownerDataHashed = ownerDataHashing(owner);
            serviceHistory
              .find({ vin: car.vin, reg: car.reg })
              .then((sHistory) => {
                let serviceData = [];
                if (sHistory) {
                  //add old service history records to data to be hashed
                  if (sHistory.length > 1) {
                    serviceData = sHistory;
                  } else if (sHistory.length === 1) {
                    serviceData.push(sHistory[0]);
                  } else {
                    serviceData = [];
                  }
                }
                accidentHistory
                  .find({ vin: car.vin, reg: car.reg })
                  .then(async (aHistory) => {
                    let accidentData = [];
                    if (aHistory) {
                      //add old accident history records to data to be hashed
                      if (aHistory.length > 1) {
                        accidentData = aHistory;
                      } else if (aHistory.length === 1) {
                        accidentData.push(aHistory[0]);
                      } else {
                        accidentData = [];
                      }
                    }
                    //make payload
                    const payload = {
                      vin: car.vin,
                      reg: data.reg,
                      millage: data.millage,
                      date: todaysDate,
                      comments: data.comments,
                    };

                    //Check that out of all 3 spare parts which of them exist and update
                    //the payload object accordingly
                    if (data.sparePart1 != "") {
                      payload.sparePart1 = data.sparePart1;
                      await verify(data.sparePart1)
                        .then((T) => {
                          console.log(T);
                          payload.isValid1 = T;
                        })
                        .catch((err) => {
                          console.log(err);
                          payload.isValid1 = "N/A";
                        });
                    }
                    if (data.sparePart2 != "") {
                      payload.sparePart2 = data.sparePart2;
                      await verify(data.sparePart2)
                        .then((T) => {
                          console.log(T);
                          payload.isValid2 = T;
                        })
                        .catch((err) => {
                          console.log(err);
                          payload.isValid2 = "N/A";
                        });
                    }
                    if (data.sparePart3 != "") {
                      payload.sparePart3 = data.sparePart3;
                      await verify(data.sparePart3)
                        .then((T) => {
                          console.log(T);
                          payload.isValid3 = T;
                        })
                        .catch((err) => {
                          console.log(err);
                          payload.isValid3 = "N/A";
                        });
                    }
                    console.log(payload);
                    //if the user selected to enter service history then
                    if (data.activeItem == "1") {
                      //add latest record to service history object
                      serviceData.push(payload);
                      const serviceDataHashed = serviceDataHashing(serviceData);
                      const accidentDataHashed = accidentDataHashing(
                        accidentData
                      );

                      //This code prints out all 4 hashes. This is for debugging purposes to see updates in block chain with multiple updates
                      /*console.log(
                        "C: " +
                          carDataHashed +
                          " O: " +
                          ownerDataHashed +
                          " S: " +
                          serviceDataHashed +
                          " A: " +
                          accidentDataHashed
                      );*/

                      //call smart contract
                      hashingTestSC.methods
                        .eventGenerator(
                          carDataHashed,
                          ownerDataHashed,
                          serviceDataHashed,
                          accidentDataHashed
                        )
                        .send({ from: accounts[0], gas: 3000000 })
                        .then((response) => {
                          // check if entry across this car exists in info hash table
                          informationHash
                            .findOne({ vin: car.vin, reg: car.reg })
                            .then((record) => {
                              //if record doesnt exist then add new record. If it exists then update
                              updateOrCreateEntryInHashTable(
                                record,
                                response,
                                car.vin,
                                data.reg
                              );

                              //Save Service data into table
                              const serviceDetails = new serviceHistory(
                                payload
                              );
                              serviceDetails.save((error) => {
                                if (error) {
                                  res
                                    .status(400)
                                    .json({ error: "error in saving!" });
                                } else {
                                  res.send(
                                    "Saved in service history successfully!"
                                  );
                                }
                              });
                            });
                        })
                        .catch((err) => console.log(err));
                    }
                    //if the user selected to enter accident history then
                    else {
                      //add latest record to accident history object
                      accidentData.push(payload);
                      const serviceDataHashed = serviceDataHashing(serviceData);
                      const accidentDataHashed = accidentDataHashing(
                        accidentData
                      );
                      //This code prints out all 4 hashes. This is for debugging purposes to see updates in block chain with multiple updates
                      /*console.log(
                        "C: " +
                          carDataHashed +
                          " O: " +
                          ownerDataHashed +
                          " S: " +
                          serviceDataHashed +
                          " A: " +
                          accidentDataHashed
                      );*/
                      hashingTestSC.methods
                        .eventGenerator(
                          carDataHashed,
                          ownerDataHashed,
                          serviceDataHashed,
                          accidentDataHashed
                        )
                        .send({ from: accounts[0], gas: 3000000 })
                        .then((response) => {
                          // check if entry across this car exists in info hash table
                          informationHash
                            .findOne({ vin: car.vin, reg: car.reg })
                            .then((record) => {
                              updateOrCreateEntryInHashTable(
                                record,
                                response,
                                car.vin,
                                car.reg
                              );

                              //save accident data into table
                              const accidentDetails = new accidentHistory(
                                payload
                              );
                              accidentDetails.save((error) => {
                                if (error) {
                                  res
                                    .status(400)
                                    .json({ error: "error in saving!" });
                                } else {
                                  res.send(
                                    "Saved in accident history successfully!"
                                  );
                                }
                              });
                            });
                        })
                        .catch((err) =>
                          console.log("Error in recieving blockNumber!\n" + err)
                        );
                    }
                  });
              });
          })
          .catch((error) => {
            res.status(400).json({ error: "No Owner Found across this Car!" });
          });
      })
      .catch((error) =>
        res
          .status(400)
          .json({ error: "No Car Found across this Registration Number!" })
      );
  }
});

//This function checks if a record against a car exists in the info hashes table
//If it exists then updates the record else it creates a new record
function updateOrCreateEntryInHashTable(record, response, vinNum, regNum) {
  if (record) {
    //Update the record
    informationHash
      .updateOne(
        { _id: record._id },
        {
          $set: {
            block: response.events.Transferred.blockNumber,
          },
        }
      )
      .then((responseUpdate) => console.log("Record Updated"));
  } else {
    //Create new record for this car
    const blockNumberInfoForDb = {
      vin: vinNum,
      reg: regNum,
      block: response.events.Transferred.blockNumber,
    };
    const newInformationHash = new informationHash(blockNumberInfoForDb);
    newInformationHash.save();
  }
}

//This function checks if existing data hashes in the database corresspond to
//the ones in the blockchain before initiating a new transaction
async function compareExistingRecords(
  vin,
  reg,
  carData,
  ownerData,
  serviceData,
  accidentData
) {
  return new Promise((resolve, reject) => {
    informationHash.findOne({ vin: vin, reg: reg }).then((record) => {
      hashingTestSC.getPastEvents(
        "AllEvents",
        {
          fromBlock: record.block,
          toBlock: record.block,
        },
        (err, events) => {
          //Compare all 4 hashes
          //If any hash does not match then send appropriate response
          //If all hashes match then send data back to front end
          if (carData == events[0].returnValues.carDetailsHash) {
            console.log("Car Data Matched!");
            if (ownerData == events[0].returnValues.ownerDetailsHash) {
              console.log("owner data Matched!");
              if (serviceData == events[0].returnValues.serviceDetailsHash) {
                console.log("Service data Matched!");
                if (
                  accidentData == events[0].returnValues.accidentDetailsHash
                ) {
                  console.log("Accident data Matched!");
                  //If hashes match and data is ok then make payload
                  resolve(true);
                }
              } else {
                reject({
                  message: "Service Data Mismatch!",
                });
              }
            } else {
              reject({
                message: "Owner Data Mismatch!",
              });
            }
          } else {
            reject({
              message: "Car Data Mismatch!",
            });
          }
        }
      ); //end then block for get events method
    }); //end then block for info hashes table
  });
}

//Verify Spareparts
async function verify(sp1) {
  return new Promise((resolve, reject) => {
    sparePart
      .find({ id: sp1 })
      .then((sparePart) => {
        if (sparePart.length > 0) {
          console.log(sparePart);
          let T = true;
          resolve(T);
        } else {
          let F = false;
          resolve(F);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = router;
