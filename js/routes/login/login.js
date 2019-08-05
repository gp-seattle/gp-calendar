//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();


const users = require('./../../data/users');


// handle incoming request to /users
router.get('/', (req, res, next) => {
    res.status(200)
    console.log(req)
    res.send("<HTML><body><p>Hello world!</p></body></HTML>")
});

module.exports = router;

