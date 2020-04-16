const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

// Saim is bundal.

//Declare an express app
const app = express();

//declare port
const port = 8080;

/* Database Connection to Mongo */
mongoose.connect("mongodb://localhost:27017/CarBlock", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Database connection established!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//log for each request on the console
app.use(morgan("tiny"));

//add a router
app.use("/", routes);

//listen on pot 8080 and log out a msg on the console
app.listen(port, console.log(`Server is running at port: ${port}`));
