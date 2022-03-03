const express = require("express");
const { database } = require("./Utils/Config");
const authRoute = require("./Controllers/authentication");
const categoriesRoute = require("./Controllers/categories");
const subCategoriesRoute = require("./Controllers/subCategories");
const subSubCategoriesRoute = require("./Controllers/subSubCategory");
const dashboardRoute = require("./Controllers/dashboard.js");
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/subcategories", subCategoriesRoute);
app.use("/api/subSubCategories", subSubCategoriesRoute);
app.use("/api/dashboard", dashboardRoute);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});