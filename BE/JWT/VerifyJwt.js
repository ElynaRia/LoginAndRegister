const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
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
}

module.exports = VerifyToken;