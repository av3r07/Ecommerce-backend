const mongoose = require("mongoose");

module.exports = mongoose.model("product_variants", new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    color: {
        type: String,
        required: true
    },
    isActive: {
        // 0 --> not active variant, 1 --> active variant
        type: Number,
        default: 1
    }
}, { timestamps: true }));