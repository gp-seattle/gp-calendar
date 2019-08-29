//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const fs = require('fs');

//acts sort of like a middleware with routing capabilities
const router = express.Router();
router.use(cookieParser())



// handle incoming request to /users
router.get('/', (req, res, next) => {

    res.cookie('seshId', 'nihuvLouSvqpJFvxBLTeCNgetG2R31y7')
    res.cookie('email', 'wyatt@gpmail.org')

   // fs.writeFileSync('./data/users.json', JSON.stringify(writeMe ));
    
    res.status(200);
    res.send('success');

    console.log(req.cookies)
});




module.exports = router;

