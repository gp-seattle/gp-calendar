//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const fs = require('fs');

//acts sort of like a middleware with routing capabilities
const router = express.Router();
router.use(cookieParser())



// handle incoming request to /users
router.delete('/', (req, res, next) => {
    var sessions = require('./../../modules/encryption/decryptSessions.js')
    var sessionIds = sessions[req.cookies.email]

    if (req.cookies.seshId && req.cookies.email){
        sessionIds.splice(sessionIds.indexOf(req.cookies.seshId), 1)

        var encryptAll = require('./../../modules/encryption/encryptSessions.js')
        encryptAll(sessions)
        
        res.cookie('seshId', 'null', {maxAge: 0})
        res.cookie('seshId', 'null', {maxAge: 0})
        res.status(200)
        res.send("Successfully logged out")
    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in logout. Missing cookies";
        next(error); 
    }
    
});




module.exports = router;

