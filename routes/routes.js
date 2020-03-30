const express = require("express");
const router = express.Router();

const userSignUp = require("./../models/userSignUp");
const workshopRegistration = require("./../models/workshopRegistration");
const carDetails = require("./../models/carSchema/carDetails");

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

//a post request to handle workshop signup
router.post("/workshopSignUp", (req, res) => {
  const data = req.body;

  //Parse Data to make 3 objects to save in 3 tables
  //HASH PASSWORD

  /*const newRegistration = new workshopRegistration(data);
  newRegistration.save(error => {
    if (!error) {
      res.json("save successfull!");
    } else {
      res.json("error occurred in saving!");
    }});*/

  console.log(data);
  res.json(data);
});

/*
  This request handles search of a vehicle by vin and reg number. 
  Model access: Car Details / Accident History / Service History / Owner History
  Test after front end complete
*/
router.post("/searchCar", (req, res) => {
  /*const data = req.body;
  let returnedCar = null;

  if (data.selectedOpt === "vin") {
    carDetails.findOne({ vin: data.number }).then(car => {
      //If car does not exist then
      if (!car) {
        return res.status(400).json({ error: "Car does not exist" });
      } else {
        returnedCar = car;
      }
    });
  }

  if (data.selectedOpt === "reg") {
    carDetails.findOne({ reg: data.number }).then(car => {
      //If car does not exist then
      if (!car) {
        return res.status(400).json({ error: "Car does not exist" });
      } else {
        returnedCar = car;
      }
    });
  }

  //retrieve data and send back to the client
  res.json(returnedCar);*/
  res.json("data recieved!");
});

module.exports = router;
