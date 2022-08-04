const mongoose = require("mongoose");

module.exports = mongoose.model("notifications", new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        default : null,
        ref : "orders"
    },
    notification : {
        type : String,
        required : true
    },
    notificationType : {
        type : Number,
        required : true,
        // 0 --> normal notification, 1 --> notification related to order
    },
    isRead : {
        type : Number,
        default : 0
        // 0 --> unread, 1 --> read
    }
}, {timestamps : true}));