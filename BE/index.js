// import module
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const KOLEKSI = require('./Model/dataSchema');
const router = express.Router();
const jwt = require('jsonwebtoken');



// config mongodb
const API = process.env.API;
const API_LOCAL = "mongodb://127.0.0.1:27017/account";
async function koneksi() { await mongoose.connect(API) };



// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);



// run on localhost
app.listen(4000, () => {
    koneksi()
        .then((result) => {
            console.log("SUCCES CONNECT TO MONGODB IN: http://localhost:4000 ");
        }).catch((err) => {
            console.log("FAILED");
        });
});










app.post('/tes', (req, res) => {
    KOLEKSI.create(req.body)
        .then(() => {
            res.send("OK")
        })
        .catch(() => {
            res.send("XXXXXXXXXXX")
        })
})


// controller
router.post('/signup', (req, res) => {
    KOLEKSI.findOne({ nama: req.body.nama })
        .then(x => {
            if (x) {
                if (x.nama == req.body.nama) {
                    res.send("Already")
                }
            } else {
                res.send("OKE");
                KOLEKSI.create(req.body)
            }
        })
})

router.post('/edit/photo', (req, res) => {
    KOLEKSI.findOneAndUpdate({ nama: req.body.nama }, { photo: req.body.photo })
        .then((x) => {
            const token = jwt.sign({ id: x._id, nama: req.body.nama, photo: req.body.photo }, "123456789", { expiresIn: "30d" });
            res.send(token);
        })
})


router.post('/signin', (req, res) => {
    KOLEKSI.findOne({ nama: req.body.nama })
        .then(x => {
            if (x) {
                if (x.password == req.body.password) {
                    const token = jwt.sign({ id: x._id, nama: req.body.nama, photo: x.photo }, "123456789", { expiresIn: "30d" });
                    res.send(token);
                } else {
                    res.send("PWSALAH")
                }
            } else {
                res.send("NOACC")
            }
        })
})


router.post('/', (req, res, next) => {
    const localStorage = req.body.headers
    if (localStorage) {
        jwt.verify(localStorage, '123456789', (err, data) => {
            if (data) {
                res.json(
                    {
                        id: data.id,
                        nama: data.nama,
                        photo: data.photo
                    }
                )
            } else {
                res.status(203).send('NO LOGIN');
            }
        })
        next();
    }
});

app.get('/', (req, res) => {
    res.send(process.env.API);
})