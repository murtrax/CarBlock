const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const alertSchema = new Schema({
    reg: String, 
    date: String,
    //millage at the time of service
    millage: String,
    garage: String,
    //the details of what type of accident was it, front end collision
    comments: String, 
    sparePart1: String,
    sparePart2: String,
    sparePart3: String,
})

const  alert = mongoose.model("alert",  alertSchema);

module.exports =  alert;