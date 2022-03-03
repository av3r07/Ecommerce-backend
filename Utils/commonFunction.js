const jwt = require("jsonwebtoken");

exports.nullChecker = (values, res, callback) => {
    let flag = false; 
    values.forEach(value => {
        if(value === "" || value === null || value === undefined) {
            flag = true;
        }
    })
    if(flag) {
        res.status(400).send({
            message : "Please fill all the fields"
        })
    } else {
        callback(null);
    }
}

exports.checkUserSession = (token, res, callback) => {
    jwt.verify(token.split(" ")[1], "ecommerce-secret-key-for-user-session", (err, data) => {
        if(err) {
            res.status(401).send({
                message : "session expired"
            });
        } else {
            callback(null, data.userId);
        }
    })
}