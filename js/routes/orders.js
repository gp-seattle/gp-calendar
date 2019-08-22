//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const fs = require('fs');

//acts sort of like a middleware with routing capabilities
const router = express.Router();
router.use(cookieParser())



// handle incoming request to /users
router.get('/', (req, res, next) => {

    var pass
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    pass = makeid(32);

    console.log(pass)

    res.cookie('seshId', pass)

    res.status(200)
   // fs.writeFileSync('./data/users.json', JSON.stringify(writeMe ));
    
    var cook = req.cookies.seshId
    console.log(cook)

    res.send(req.cookies.seshId);
});




module.exports = router;

