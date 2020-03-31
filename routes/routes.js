const express = require("express");
const router = express.Router();

const userSignUp = require("./../models/userSignUp");
const workshopRegistration = require("./../models/workshopRegistration");
const carDetails = require("./../models/carSchema/carDetails");
<<<<<<< HEAD
const ownershipHistory = require("./../models/carSchema/ownershipHistory");
const serviceHistory = require("./../models/carSchema/serviceHistory");
const accidentHistory = require("./../models/carSchema/accidentHistory");
=======
>>>>>>> Hassaan

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
<<<<<<< HEAD
 /* const data = req.body;
  let returnedCar = null;
  let ownership = null;
=======
  /*const data = req.body;
  let returnedCar = null;
>>>>>>> Hassaan

  if (data.selectedOpt === "vin") {
    carDetails.findOne({ vin: data.number }).then(car => {
      //If car does not exist then
      if (!car) {
        return res.status(400).json({ error: "Car does not exist" });
      } else {
        returnedCar = car;
      }
    });
<<<<<<< HEAD

    ownershipHistory.findOne({vin: data.number}, {yearPurchased: 1, millage: 1, city: 1, state: 1}).then(owner => {
      if (!owner) {
        return res.status(400).json({error: "Ownership history does not exist"})
      }
      else {
        ownership = owner; 
      }
    })
  }


=======
  }

>>>>>>> Hassaan
  if (data.selectedOpt === "reg") {
    carDetails.findOne({ reg: data.number }).then(car => {
      //If car does not exist then
      if (!car) {
        return res.status(400).json({ error: "Car does not exist" });
      } else {
        returnedCar = car;
      }
    });
<<<<<<< HEAD

    ownershipHistory.findOne({vin: data.number}, {yearPurchased: 1, millage: 1, city: 1, state: 1}).then(owner => {
      if (!owner) {
        return res.status(400).json({error: "Ownership history does not exist"})
      }
      else {
        ownership = owner; 
      }
    });

    
  }

  //retrieve data and send back to the client
  res.json(returnedCar);
  res.json("data recieved!");*/
});


router.post("/CarEntry", (req, res)=> {
  
  const data = req.body;

  carDetails.find({vin: data.vin}).then(car=> {
    if (car)
    {
      return res.status(400).json({error: "A vehicle with this VIN already exists"})
    }

  })

  carDetails.find({reg: data.reg}).then(car=> {
    if (car)
    {
      return res.status(400).json({error: "A vehicle with this REG already exists"})
    }
    
  })

  const carData = {
  
    vin: data.vin,
    reg: data.req,
    make: data.make,
    model: data.model,
    year: data.year,
    varaint: data.variant,
    type: data.type,
    fuel: data.fuel,
    drive: data.drive
  }

  const ownerData = {
    vin: data.vin,
    reg: data.reg,
    yearPurchased: data.yearPurchased,
    millage: data.millage,
    city: data.city,
    state: data.state,
    ownerName: data.ownerName,
    ownerCNIC: data.ownerCNIC,
    ownerContact: data.ownerContact
  }

  const newCarDetails = new carDetails(carData);
  const newOwner = new ownershipHistory(ownerData);

  newCarDetails.save(error => {
    if (error)
    {
      console.log("There was an error saving Car Details")
      return res.status(400).json({error: "There was an error saving Car Details"})
    }
    else {
      console.log("Car Details saved sucessfully")
    }
  })

  newOwner.save(error=> {
    if (error)
    {
      console.log("There was an errros saving ownership history");
     return res.status(400).json({error: "There was an error saving "})
    }

    else {
      console.log("Onwership details saved sucessfully")
    }
  })

  res.send("The new car entry was sucessfully saved");
  console.log("The new car entry was sucessfully saved");

})
=======
  }

  //retrieve data and send back to the client
  res.json(returnedCar);*/
  res.json("data recieved!");
});

>>>>>>> Hassaan
module.exports = router;
