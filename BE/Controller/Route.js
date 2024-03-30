const KOLEKSI = require('../Model/dataSchema');
const express = require('express');
const router = express.Router();
const VerifyToken = require('../JWT/VerifyJwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();



router.post('/tes', (req, res) => {
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


router.post('/', VerifyToken)


module.exports = router;
