const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});