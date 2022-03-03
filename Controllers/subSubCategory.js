const router = require("express").Router();
const async = require("async");
const SubSubCategories = require("../Models/SubSubCategories");
const mongoose = require("mongoose");
const { nullChecker, checkUserSession } = require("../Utils/commonFunction");

router.get("/", function(req, res) {
    const token = req.headers.authorization;
    const { subCategoryId } = req.body;

    async.waterfall([
        callback => {
            nullChecker([token, subCategoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback )=> {
            SubSubCategories.aggregate([
                {$match : { subCategoryId : mongoose.Types.ObjectId(subCategoryId)}},
                { $project : {
                    _id : 0,
                    subsubCategoryId : "$_id",
                    name : 1
                } }
            ]).then(results => {
                callback(null, results)
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, subSubCategories) => {
        if(err) {
            res.status(400).send({
                message : "error while fetching subSubCategories"
            });
        } else {
            res.status(200).send({
                message : "subSubCategories fetched successfully",
                data : {
                    subSubCategories : subSubCategories
                }
            });
        }
    })
});

router.post("/", function(req, res) {
    const { name, subCategoryId, categoryId } = req.body;
    const token = req.headers.authorization;

    async.waterfall([
        callback => {
            nullChecker([name, token, subCategoryId, categoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            SubSubCategories.aggregate([
                { $match : {
                    name : name,
                    subCategoryId : mongoose.Types.ObjectId(subCategoryId)
                }}
            ]).then(results => {
                if(results.length > 0) {
                    res.status(400).send({
                        message : "subSubCategory already exists"
                    });
                } else {
                    callback(null);
                }
            }).catch(err => {
                callback(err);
            });
        },
        callback => {
            SubSubCategories.create({
                name : name,
                subCategoryId : subCategoryId,
                categoryId : categoryId
            }).then(result => {
                callback(null, result);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err, subSubCategory) => {
        if(err) {
            res.status(400).send({
                message : "error while creating subSubCategory"
            });
        } else {
            res.status(200).send({
                message : "subSubCategory created successfully",
                data : {
                    subSubCategory : {
                        name : subSubCategory.name,
                        subSubCategoryId : subSubCategory._id,
                        subCategoryId : subSubCategory.subCategoryId,
                        categoryId : subSubCategory.categoryId
                    }
                }
            });
        }
    })
});

router.patch("/:subsubCategoryId", function(req, res) {
    const { name, subCategoryId } = req.body;
    const subsubCategoryId = req.params.subsubCategoryId;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([name, token, subsubCategoryId, subCategoryId], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            SubSubCategories.aggregate([
                { $match : {
                    name : name,
                    subCategoryId : mongoose.Types.ObjectId(subCategoryId)
                }}
            ]).then(results => {
                if(results.length > 0) {
                    res.status(400).send({
                        message : "subSubCategory already exists"
                    });
                } else {
                    callback(null);
                }
            }).catch(err => {
                callback(err);
            });
        },
        callback => {
            SubSubCategories.findOneAndUpdate(
                { _id : mongoose.Types.ObjectId(subsubCategoryId) },
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
    ], (err, subSubCategory) => {
        if(err) {
            res.status(400).send({
                message : "error updating subSubCategory details"
            });
        } else {
            res.status(200).send({
                message : "subSubCategory updated successfully",
                data : {
                    subSubCategory : {
                        name : subSubCategory.name,
                        subSubCategoryId : subSubCategory._id,
                        subCategoryId : subSubCategory.subCategoryId,
                        categoryId : subSubCategory.categoryId
                    }
                }
            });
        }
    })
});

router.delete("/:subSubCategoryId", function(req, res) {
    const subSubCategoryId = req.params.subSubCategoryId;
    const token = req.headers.authorization;
    async.waterfall([
        callback => {
            nullChecker([subSubCategoryId, token], res, callback);
        },
        callback => {
            checkUserSession(token, res, callback);
        },
        (userId, callback) => {
            SubSubCategories.remove({ _id : mongoose.Types.ObjectId(subSubCategoryId)}).then(result => {
                callback(null);
            }).catch(err => {
                callback(err);
            })
        }
    ], (err) => {
        if(err) {
            res.status(400).send({
                message : "error deleting subSubcategory"
            });
        } else {
            res.status(200).send({
                message : "subSubcategory deleted successfully"
            });
        }
    })
});

module.exports = router;