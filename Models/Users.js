const mongoose = require("mongoose");

module.exports = mongoose.model("users", new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    contactNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        trim: true,
        default: null
    },
    userType: {
        // 1 : super admin, 2 : admins, 3 : point of contacts, 4 --> corporates
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    isBlocked: {
        type: Number,
        default: 0
    }
}, { timestamps: true }));