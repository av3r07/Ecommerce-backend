const mongoose = require("mongoose");

module.exports = mongoose.model("purchaseDetails", new mongoose.Schema({
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
    customVariant : {
        type : String,
        default : null
    },
    quantity : {
        type : Number,
        required : true
    },
    vendorDetails : {
        name : {
            type : String,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        mobile : {
            type : Number,
            required : true
        }
    },
    purchaseDetails : {
        amount : {
            type : Number,
            required : true
        },
        tax : {
            amount : {
                type : Number,
                required : true
            },
            percentage : {
                type : Number,
                required : true
            },
            name : {
                type : String,
                required : true
            }
        }
    }
}, {timestamps : true}));