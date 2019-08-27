//imports express
const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs');

const router = express.Router();
router.use(cookieParser())



// handle incoming request to /users
router.get('/', (req, res, next) => {

    var email = req.cookies.email;
    var seshId = req.cookies.seshId

    console.log(req.cookies.email)

    if  (email && seshId && checkSession(email, seshId)) {
        var users = require('./../modules/encryption/decryptUsers.js')
        //checks to ensure account is valid
        for(user in users) {
            //finds account
            if(user[email] == req.cookies.email) {
                //sends info if valid
                if (user[isAdmin] == 'true') {
                    res.status(200)    
                    res.send(users);
                } else {
                    const error = new Error("Bad Requests");
                    error.status = 403;
                    error.message = "403 in get_user_data. User is not an admin";
                    next(error);  
                }
            }
        }
    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in get_user_data. Missing cookies";
        next(error);  
    }
});


//checks if session is valid
function checkSession(email, id) {
    var sessions = require('./../modules/encryption/decryptSessions.js')
    console.log(sessions[email] == id)
}

module.exports = router