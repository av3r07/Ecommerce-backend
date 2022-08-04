const mongoose = require("mongoose");

module.exports = mongoose.model("orderProducts", new mongoose.Schema({
   orderId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "orders",
       required : true
   },
   productId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "products",
       required : true
   },
   quantity : {
       type : Number,
       default : 1
   },
   variantId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "product_variants",
   },
   productName : {
       type : String,
       required : true
   },
   variantName : {
       type : String,
       default : null
   },
   image : {
       type : String,
       required : true
   },
   price : {
       type : Number,
       required : true
   },
   unitTax : {
       type : Object,
       required : true
   },
   mockupImages : {
       type : Array,
       default : null
   },
   mockupStatus : {
       type : Number,
       default : 0
    //   0 --> waiting for uploads ,1 --> rejected ,2 --> approved
   }
}, {timestamps : true}));