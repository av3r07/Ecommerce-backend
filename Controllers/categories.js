const router = require("express").Router();
const async = require("async");
const Categories = require("../Models/Categories");
const mongoose = require("mongoose");
const { nullChecker, checkUserSession } = require("../Utils/commonFunction");

router.get("/", function(req, res) {
    const token = req.headers.authorization;

    async.waterfall([
        callback => {
            nullChecker([token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback )=> {
            Categories.find(null,{name : 1, _id : 0, categoryId : "$_id"}).sort({createdAt : -1}).then(results => {
                callback(null, results)
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, categories) => {
        if(err) {
            res.status(400).send({
                message : "error while fetching categories"
            });
        } else {
            res.status(200).send({
                message : "categories fetched successfully",
                data : {
                    categories : categories
                }
            });
        }
    })
});

router.post("/", function(req, res) {
    const { name } = req.body;
    const token = req.headers.authorization;

    async.waterfall([
        callback => {
            nullChecker([name, token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback )=> {
            Categories.create({
                name : name
            }).then(result => {
                callback(null, result);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, category) => {
        if(err) {
            if(err.code === 11000) {
                res.status(400).send({
                    message : "category already exists"
                });
            } else {
                res.status(400).send({
                    message : "error while creating category"
                });
            }
        } else {
            res.status(200).send({
                message : "category created successfully",
                data : {
                    category : {
                        name : category.name,
                        categoryId : category._id
                    }
                }
            });
        }
    })
});

router.patch("/:categoryId", function(req, res) {
    const { name } = req.body;
    const categoryId = req.params.categoryId;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([name, token, categoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            Categories.findOneAndUpdate(
                { _id : mongoose.Types.ObjectId(categoryId) },
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
    ], (err, category) => {
        if(err) {
            if(err.code) {
                res.status(400).send({
                    message : "category already exists"
                });
            } else {
                res.status(400).send({
                    message : "error updating category details"
                });
            }
        } else {
            res.status(200).send({
                message : "category updated successfully",
                data : {
                    category : {
                        categoryId : category._id,
                        name : category.name
                    }
                }
            });
        }
    })
});

router.delete("/:categoryId", function(req, res) {
    const categoryId = req.params.categoryId;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([categoryId, token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            Categories.remove({ _id : mongoose.Types.ObjectId(categoryId)}).then(result => {
                callback(null);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err) => {
        if(err) {
            res.status(400).send({
                message : "error deleting category"
            });
        } else {
            res.status(200).send({
                message : "category deleted successfully"
            });
        }
    })
});

module.exports = router;