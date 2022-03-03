const router = require("express").Router();
const async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../Models/Users");
const mongoose = require("mongoose");
const { nullChecker, checkUserSession } = require("../Utils/commonFunction");

router.post('/signup', function(req, res) {
    const { email, password, name } = req.body;
    async.waterfall([
        callback => {
            nullChecker([email, password, name], res, callback);
        },
        callback => {
            bcrypt.hash(password, 10, (err, result) => {
                if(err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            })
        },
        (encryptedPassword, callback) => {
            Users.create({ 
                name : name.toLowerCase(),
                password : encryptedPassword,
                email : email.toLowerCase()
            }).then(result => {
                callback(null, result);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err) => {
        if(err, userData) {
            if(err.code === 11000) {
                res.status(400).send({
                    message : "already registered"
                });
            } else {
                res.status(400).send({
                    message : "Some error occured"
                });
            }
        } else {
            res.status(200).send({
                message : "registered successfully",
                data : {
                    userData : {
                        name : userData.name,
                        userId : userData._id,
                        email : userData.email
                    }
                }
            })
        }
    })
});

router.post('/login', function(req, res) {
    const { email, password } = req.body;
    async.waterfall([
        callback => {
            nullChecker([email, password], res, callback);
        },
        callback => {
            Users.aggregate([
                { $match : { email : email } },
                { $project : {
                    "_id" : 0,
                    "userId" : "$_id",
                    "name" : 1,
                    "email" : 1,
                    "password" : 1
                }}
            ]).then(result => {
                if(result.length > 0) {
                    callback(null, result[0]);
                } else {
                    res.status(400).send({
                        message : "no user found"
                    });
                }
            }).catch(err => {
                callback(err)
            })
        },
        (userData, callback) => {
            bcrypt.compare(password, userData.password, (err, result) => {
                if(err) {
                    callback(err);
                } else {
                    if(result) {
                        callback(null, userData);
                    } else {
                        res.status(400).send({
                            message : "wrong password"
                        });
                    }
                }
            })
        },
        (userData, callback) => {
            let token = jwt.sign(
                { userId : userData.userId },
                "ecommerce-secret-key-for-user-session",
                { expiresIn : "7d"}
            );
            if(token) {
                token = "Bearer " + token;
                callback(null, userData, token);
            } else {
                callback("err");
            }
        }
    ], (err, userData, token) => {
        if(err) {
            res.status(400).send({
                message : "Some error occured"
            });
        } else {
            res.status(200).send({
                message : "Logged in successfully",
                token : token,
                data : {
                    userData : {
                        userId : userData.userId,
                        name : userData.name,
                        email : userData.email
                    }
                }
            });
        }
    })
});

router.post("/getUserDetails", function(req, res) {
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback)
        }, 
        (userId, callback) => {
            Users.aggregate([
                { $match : { _id : mongoose.Types.ObjectId(userId) }},
                { $project : {
                    _id : 0,
                    userId : "$_id",
                    name : 1,
                    email : 1
                }}
            ]).then(result => {
                if(result.length > 0) {
                    callback(null, result[0])
                } else {
                    res.status(400).send({
                        message : "no user found"
                    });
                }
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, userData) => {
        if(err) {
            res.status(400).send({
                message : "some error occured"
            });
        } else {
            res.status(200).send({
                message : "user details fetched successfully",
                data : {
                    userData : userData
                }
            });
        }
    })
})

router.patch("/editUser", function(req, res) {
    const { name } = req.body;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([name, token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            Users.findOneAndUpdate(
                { _id : mongoose.Types.ObjectId(userId) },
                { $set : {
                    name : name
                }},
                { new : true },
                (err, result) => {
                    if(err) {
                        callback(err)
                    } else {
                        callback(null, result);
                    }
                }
            )
        }
    ], (err, userData) => {
        if(err) {
            res.status(400).send({
                message : "error updating user details"
            });
        } else {
            res.status(200).send({
                message : "user details fetched successfully",
                data : {
                    userData : {
                        userId : userData._id,
                        name : userData.name,
                        email : userData.email
                    }
                }
            });
        }
    })
})

module.exports = router;