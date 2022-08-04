const mongoose = require("mongoose");

module.exports = mongoose.model("presetPacks", new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    description : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    products : {
        type : Array,
        required : true
    },
    isActive : {
        // 0 --> not active pack, 1 --> active pack
        type : Number,
        default : 0
    }
}, {timestamps : true}));