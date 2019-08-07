//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();

const data = require('../calDataToJson')


const orders = require('./../data/orders');


// handle incoming request to /users
router.get('/', (req, res, next) => {
    res.status(200)
    console.log(data)
    res.send(data);
});




module.exports = router;

