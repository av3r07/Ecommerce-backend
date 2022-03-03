const mongoose = require("mongoose");

module.exports = mongoose.model("sub_sub_categories",  new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    categoryId : {
        ref : "categories",
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    subCategoryId : {
        ref : "sub_categories",
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {timestamps : true}));;