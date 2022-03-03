const router = require("express").Router();
const Categories = require("../Models/Categories.js");

router.get("/menu", function(req, res) {
    Categories.aggregate([
        {
            $lookup : {
                from : "sub_categories",
                localField : "_id",
                foreignField : "categoryId",
                pipeline : [
                    {$lookup : {
                        from : "sub_sub_categories",
                        localField : "_id",
                        foreignField : "subCategoryId",
                        pipeline : [
                            {$project : {
                                _id : 0,
                                name : 1
                            }}
                        ],
                        as : "subSubCategories"
                    }},
                    {$project : {
                        _id : 0,
                        name : 1,
                        subSubCategories : "$subSubCategories"
                    }}
                ],
                as : "subCategories"
            }
        },
        {$project : {
            _id : 0,
            name : 1,
            subCategories : "$subCategories"
        }},
    ]).then(results => {
        res.status(200).send({
            message : "fetched data successfully",
            data : {
                categories : results
            }
        });
    }).catch(err => {
        res.status(400).send({
            message : "some  error occuerd"
        });
    })
});

module.exports = router;