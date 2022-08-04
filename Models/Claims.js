const mongoose = require("mongoose");

module.exports = mongoose.model("claims", new mongoose.Schema({
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "orders"
    },
    firstName : {
        type : String,
        required : true,
        lowercase : true
    },
    lastName : {
        type : String,
        required :true,
        lowercase : true
    },
    address : {
        addressLine1 : {
            type : String, 
            required : true
        },
        addressLine2 : {
            type : String, 
            required : true
        },
        city : {
            type : String, 
            required : true
        },
        state : {
            type : String, 
            required : true
        },
        country : {
            type : String, 
            required : true
        },
        pincode : {
            type : Number, 
            required : true
        }
    },
    contactNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String, 
        default : null
    },
    customVariantSelected : {
        type : Array,
        default : null
    }
}, {timestamps : true}));