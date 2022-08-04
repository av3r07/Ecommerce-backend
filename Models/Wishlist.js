const mongoose = require("mongoose");

module.exports = mongoose.model("wishlist", new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    presetPacks : {
        type : Array,
        default : null
    },
    products : {
        type : Array,
        default : null
    }
}, {timestamps : true}));