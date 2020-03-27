const express = require("express");
const router = express.Router();

const userSignUp = require("./../models/userSignUp");
const workshopRegistration = require("./../models/workshopRegistration");

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

module.exports = router;
