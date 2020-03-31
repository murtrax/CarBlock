const express = require("express");
const router = express.Router();

const userSignUp = require("./../models/userSignUp");
const workshopRegistration = require("./../models/workshopRegistration");
const carDetails = require("./../models/carSchema/carDetails");
const ownershipHistory = require("./../models/carSchema/ownershipHistory");
const serviceHistory = require("./../models/carSchema/serviceHistory");
const accidentHistory = require("./../models/carSchema/accidentHistory");

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
  const data = req.body;
  console.log(data);
  let returnedCar = null;
  let ownership = null;

  if (data.selectedOpt === "vin") {
    carDetails.findOne({ vin: data.number }).then(car => {
      //If car does not exist then
      if (!car) {
        return res.status(400).send("Car does not exist" );
      } else {
        returnedCar = car;
      }
    
      ownershipHistory.findOne({vin: data.number}, {yearPurchased: 1, millage: 1, city: 1, state: 1}).then(owner => {
        if (!owner) {
          return res.status(400).send( "Ownership history does not exist")
        }
        else {
          ownership = owner;
          res.json({owner: ownership, car: returnedCar});
        }
        //retrieve data and send back to the client
      })
    })
  }

  if (data.selectedOpt === "reg") {
    carDetails.findOne({ reg: data.number }).then(car => {
      //If car does not exist then
      if (!car) {
        return res.status(400).send( "Car does not exist" );
      } else {
        returnedCar = car;
      }

      ownershipHistory.findOne({reg: data.number}, {yearPurchased: 1, millage: 1, city: 1, state: 1}).then(owner => {
        if (!owner) {
          return res.status(400).send("Ownership history does not exist")
        }
        else {
          ownership = owner; 
        }
        //retrieve data and send back to the client
        res.json(returnedCar);
      })
    })
  }
});


router.post("/CarEntry", (req, res)=> {
  
  const data = req.body;

  carDetails.findOne( {$or: [{reg: data.regNumber}, {vin: data.vinNumber} ]})
  .then(car => {
    if (car) {
      return res.status(400).send("A vehicle with this VIN or Reg Number already exists");
    }
    else {
      const carData = {
        vin: data.vinNumber,
        reg: data.regNumber,
        make: data.make,
        model: data.model,
        year: data.year,
        varaint: data.variant,
        type: data.type,
        fuel: data.fuel,
        drive: data.drive
      }
      const ownerData = {
        vin: data.vinNumber,
        reg: data.regNumber,
        yearPurchased: data.year,
        millage: data.millage,
        city: data.ownerCity,
        state: data.ownerState,
        ownerName: data.FullName,
        ownerCNIC: data.ownerCNIC,
        ownerContact: data.ownerContact
      }
      const newCarDetails = new carDetails(carData);
      const newOwner = new ownershipHistory(ownerData);
      newCarDetails.save(error => {
        if (error) {
          return res.status(400).json({error: "There was an error saving Car Details"})
        }
      })
      newOwner.save(error=> {
        if (error) {
         return res.status(400).json({error: "There was an error saving new Owner details"})
        }
      })
      res.send("The new car entry was sucessfully saved");
    }
  })
})
module.exports = router;
