const mongoose = require("mongoose");

exports.database = mongoose.connect("mongodb+srv://abhishek:abhishek@ecommerce.vxif1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology : true, useNewUrlParser : true }).then(res => {
    console.log("connected to database successfully");
}).catch(err => {
    console.log("connection to database failed");
})