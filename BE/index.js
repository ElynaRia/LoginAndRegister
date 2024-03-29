// import module
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const router = require('./Controller/Route');
const bodyParser = require('body-parser');



// config mongodb
const API = process.env.API;
const API_LOCAL = "mongodb://127.0.0.1:27017/account";
async function koneksi() { await mongoose.connect(API) };



// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api", router);



// run on localhost
app.listen(4000, () => {
    koneksi()
        .then((result) => {
            console.log("SUCCES CONNECT TO MONGODB IN: http://localhost:4000 ");
        }).catch((err) => {
            console.log("FAILED");
        });
});


app.get("/", (req, res) => {
    res.send(process.env.CORS_URL)
})