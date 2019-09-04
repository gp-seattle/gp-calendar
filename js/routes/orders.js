//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const fs = require('fs');

//acts sort of like a middleware with routing capabilities
const router = express.Router();
router.use(cookieParser())
var users = require('./../modules/encryption/decryptUsers')


// handle incoming request to /users
router.get('/', (req, res, next) => {

    res.cookie('validated', 'valid')
    res.cookie('seshId', 'BG5lHyoerlsA2wPi263lj4PMdoOprDy6')
    res.cookie('email', 'wyatt4@gpmail.org')
   // fs.writeFileSync('./data/users.json', JSON.stringify(writeMe ));
    
    res.status(200);
    res.send(users);
});




module.exports = router;

