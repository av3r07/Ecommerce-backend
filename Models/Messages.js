const mongoose = require("mongoose");

module.exports = mongoose.model("messages", new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    message : {
        type : String,
        required : true
    },
    isRead : {
        type : Number,
        default : 0
        // 0 --> unread, 1 --> read
    }
}, {timestamps : true}));