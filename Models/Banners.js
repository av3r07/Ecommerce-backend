const mongoose = require("mongoose");

module.exports = mongoose.model("banners", new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    isActive : {
        type : Number, 
        default : 1
    }
}, {timestamps : true}));