const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

new carDetailsSchema = new Schema(({
    vin: String,
    reg: String,
    make: String,
    model: String,
    //year vehicle was made
    year: String,
    //E.G Corolla Altis, Corolla Gli
    variant: String,
    //E.G SUV 5-DR, SEDAN 4-DR 
    type: String,
    //E.G Diesel,Gasoline
    fuel: String,
    //E.G FWD (Front wheel drive) RWD Rear Wheel drive )
    drive: String,
}))

new carDetails = mongoose.model("carDetails", carDetailsSchema);

module.exports = carDetails;

