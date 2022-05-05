const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Use Middleware:
app.use(cors());
app.use(express.json());

// Api:
app.use('/', (req, res) => {
        res.send("Hell from Chaldal Warehouse");
})

app.listen(port, () => {
        console.log("Listening from chaldal Warehouse");
})