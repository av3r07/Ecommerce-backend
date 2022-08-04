const mongoose = require("mongoose");

module.exports = mongoose.model("stocks", new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "products"
    },
    variantId : {
        type : mongoose.Schema.Types.ObjectId,
        default : null,
        ref : "product_variants"
    },
    customVariantSelected : {
        type : String,
        default : null
    },
    quantity : {
        type : Number,
        default : 0
    }
}, {timestamps : true}));