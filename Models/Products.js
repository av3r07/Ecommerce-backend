const mongoose = require("mongoose");

module.exports = mongoose.model("products", new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    defaultVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_variants"
    },
    sellingPriceLevels: {
        type: Array,
        required: true
    },
    unitTax: {
        taxName: {
            type: String,
            required: true
        },
        taxPercentage: {
            type: Number,
            required: true
        }
    },
    totalSale: {
        type: Number,
        default: 0
    },
    isActive: {
        // 0 --> not active product, 1 --> active products
        type: Number,
        default: 1
    }
}, { timestamps: true }));