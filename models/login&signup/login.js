const mongoose = require ("mongoose")

const Schema = mongoose.Schema;

const loginSchema =  new Schema({

        email: String,
        password: String,
})                   

const login = mongoose.model("loginSchema", loginSchema);

module.exports = login;