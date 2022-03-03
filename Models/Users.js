const mongoose = require("mongoose");

module.exports = mongoose.model("users",  new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true}));;