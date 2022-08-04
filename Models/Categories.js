const mongoose = require("mongoose");

module.exports = mongoose.model("categories", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        // 0 --> not active category, 1 --> active category
        type: Number,
        default: 1
    }
}, { timestamps: true }));