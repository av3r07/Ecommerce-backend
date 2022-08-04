const mongoose = require("mongoose");

module.exports = mongoose.model("orders", new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    totalAmount : {
       type : Number,
       required : true
    },
    totalAmountWithTax : {
       type : Number,
       required : true
    },
    shippingCost : {
        type : Number,
        default : null
    },
    pocId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        default : null
    },
    quantity : {
        type : Number,
        required : true,
    },
    deliveryDate : {
        type : String,
        default : null
    },
    perUnitCost : {
        type : Number,
        default : 0
    },
    comment : {
        type : String,
        default : null
    },
    logos : {
        type : Array,
        default : null
    },
    orderStatus : {
        type : Number,
        default : 1
        //   0 --> cancelled ,1 --> placed, 2 --> waiting for approval by seller, 3--> waiting for mack ups to upload, 4 --> mockups uploaded, 5 --> mockups rejected please upload more, 6 --> all mockups approved, 7 --> waiting for payment, 8 --> payment done, 9 --> waiting for completion  ,10 --> compledted
    }
}, {timestamps : true}));