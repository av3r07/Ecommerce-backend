const router = require("express").Router();
const async = require("async");
const mongoose = require("mongoose");
const fs = require("fs");
const Products = require("../Models/Products");
const ProductVariants = require("../Models/ProductVariants");
const { nullChecker, fetchUserDetails, upload } = require("../Utils/CommonFunctions");

router.post("/", upload.array("images"), function (req, res) {
    const token = req.headers.authorization;
    const { categoryId, name, description, details, sellingPriceLevels, sku, unitTax } = req.body;
    const customVariant = req.body.customVariant || {
        name: null,
        variants: null
    };;
    const variants = req.body.variants || [];


    if (req.files && req.files.length > 0 && variants.length === req.files.length && variants.length > 0) {
        if (sellingPriceLevels && sellingPriceLevels.length === 6) {
            async.waterfall([
                callback => {
                    nullChecker([token, categoryId, name, description, details, sku, unitTax.taxName, unitTax.taxPercentage], res, callback);
                },
                callback => {
                    fetchUserDetails(1, token, res, callback);
                },
                (userData, callback) => {
                    if (userData.userType === 3 || userData.userType === 4) {
                        res.status(401).send({
                            message: "access denied"
                        });
                    } else if (userData.isBlocked && userData.userType !== 1) {
                        res.status(401).send({
                            message: "your acount has been blocked"
                        });
                    } else {
                        async.waterfall([
                            cb => {
                                Products.create({
                                    name: name,
                                    description: description,
                                    details: details,
                                    productType: productType,
                                    unitTax: unitTax,
                                    categoryId: mongoose.Types.ObjectId(categoryId),
                                    sku: sku,
                                    sellingPriceLevels: sellingPriceLevels,
                                    customVariant: customVariant,
                                    productType: 1
                                }).then(result => {
                                    cb(null, result._id);
                                }).catch(err => {
                                    cb(err);
                                })
                            },
                            (productId, cb) => {
                                let uploadedProductVariantsImages = [];
                                async.each(variants, (variant, cb1) => {
                                    let index = variants.indexOf(variant);
                                    ProductVariants.create({
                                        productId: productId,
                                        image: req.files[index].filename,
                                        name: variant.name,
                                        color: variant.color
                                    }).then(result => {
                                        uploadedProductVariants.push(result)
                                        cb1();
                                    }).catch(err => {
                                        if (fs.existsSync(`./Images/${req.files[index].filename}`)) {
                                            fs.unlinkSync(`./Images/${req.files[index].filename}`);
                                            cb1();
                                        } else {
                                            cb1();
                                        }
                                    })
                                }, () => {
                                    cb(null, productId, uploadedProductVariants[0])
                                })
                            }
                        ], (err, productId, defaultVariant) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, productId, defaultVariant);
                            }
                        })
                    }
                },
                (productId, defaultVariant, callback) => {
                    if (defaultVariant) {
                        Products.findOneAndUpdate(
                            { $match: { "_id": mongoose.Types.ObjectId(productId) } },
                            { $set: { defaultVariantId: defaultVariant._id } }
                        ).then(result => {
                            callback(null);
                        }).catch(err => {
                            callback(null);
                        })
                    } else {
                        callback(null)
                    }
                }
            ], (err) => {
                if (err) {
                    res.status(400).send({
                        message: "product creation failed"
                    });
                } else {
                    res.status(200).send({
                        message: "product creation successfully"
                    });
                }
            })
        } else {
            res.status(400).send({
                message: "please fill all the pricing levels"
            });
        }
    } else if (variants.length === 0) {
        res.status(400).send({
            message: "please upload variants"
        });
    } else {
        res.status(400).send({
            message: "please upload all images of variants"
        });
    }
})

module.exports = router;