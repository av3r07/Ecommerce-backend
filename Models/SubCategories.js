const mongoose = require("mongoose");

module.exports = mongoose.model("sub_categories",  new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    categoryId : {
        ref : "categories",
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {timestamps : true}));;