const router = require("express").Router();
const async = require("async");
const SubCategories = require("../Models/SubCategories");
const mongoose = require("mongoose");
const { nullChecker, checkUserSession } = require("../Utils/commonFunction");

router.get("/", function(req, res) {
    const token = req.headers.authorization;
    const { categoryId } = req.body;

    async.waterfall([
        callback => {
            nullChecker([token, categoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback )=> {
            SubCategories.aggregate([
                {$match : { categoryId : mongoose.Types.ObjectId(categoryId)}},
                { $project : {
                    _id : 0,
                    subCategoryId : "$_id",
                    name : 1
                } }
            ]).then(results => {
                callback(null, results)
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, subCategories) => {
        if(err) {
            res.status(400).send({
                message : "error while fetching subCategories"
            });
        } else {
            res.status(200).send({
                message : "subCategories fetched successfully",
                data : {
                    subCategories : subCategories
                }
            });
        }
    })
});

router.post("/", function(req, res) {
    const { name, categoryId } = req.body;
    const token = req.headers.authorization;

    async.waterfall([
        callback => {
            nullChecker([name, token, categoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback )=> {
            SubCategories.create({
                name : name,
                categoryId : categoryId
            }).then(result => {
                callback(null, result);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, subCategory) => {
        if(err) {
            if(err.code === 11000) {
                res.status(400).send({
                    message : "subCategory already exists"
                });
            } else {
                res.status(400).send({
                    message : "error while creating subCategory"
                });
            }
        } else {
            res.status(200).send({
                message : "subCategory created successfully",
                data : {
                    subCategory : {
                        name : subCategory.name,
                        subCategoryId : subCategory._id,
                        categoryId : subCategory.categoryId
                    }
                }
            });
        }
    })
});

router.patch("/:subCategoryId", function(req, res) {
    const { name } = req.body;
    const subCategoryId = req.params.subCategoryId;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([name, token, subCategoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            SubCategories.findOneAndUpdate(
                { _id : mongoose.Types.ObjectId(subCategoryId) },
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
    ], (err, subCategory) => {
        if(err) {
            if(err.code) {
                res.status(400).send({
                    message : "subCategory already exists"
                });
            } else {
                res.status(400).send({
                    message : "error updating subCategory details"
                });
            }
        } else {
            res.status(200).send({
                message : "subCategory updated successfully",
                data : {
                    subCategory : {
                        subCategoryId : subCategory._id,
                        name : subCategory.name,
                        categoryId : subCategory.categoryId
                    }
                }
            });
        }
    })
});

router.delete("/:subCategoryId", function(req, res) {
    const subCategoryId = req.params.subCategoryId;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([subCategoryId, token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            SubCategories.remove({ _id : mongoose.Types.ObjectId(subCategoryId)}).then(result => {
                callback(null);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err) => {
        if(err) {
            res.status(400).send({
                message : "error deleting subcategory"
            });
        } else {
            res.status(200).send({
                message : "subcategory deleted successfully"
            });
        }
    })
});

module.exports = router;