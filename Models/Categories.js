const mongoose = require("mongoose");

module.exports = mongoose.model("categories",  new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    }
}, {timestamps : true}));;