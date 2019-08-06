//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();

const data = require('./../caldata')


const orders = require('./../data/orders');

console.log(data)
console.log("^this should be the data")

// handle incoming request to /users
router.get('/', (req, res, next) => {
    res.status(200)
    console.log(data)
    res.send(data);
});




module.exports = router;

