//imports express
const express = require('express')
const cookieParser = require('cookie-parser')


const router = express.Router();
router.use(cookieParser())


// handle incoming request to /users
router.get('/', (req, res, next) => {
    //checks for current session
    if (req.cookies.seshId) {

    } else {
        var users = require('./../../modules/decryptUsers.js')

        if (!req.body.email) {
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 Missing parameter: email";
            next(error);   
        }
        if (!req.body.pass) {
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 Missing parameter: pass";
            next(error);   
        }


        var found = false
        var user = null;
        for (i = 0; i < users.length && !found; i++) {
            if (users[i]['email'] == req.body.email) {
                found = true;
                user = users[i]
            }
        }
    
        if (req.body.pass === user['hashpass']) {
            res.status(200)
            var makeid = require ('./../../modules/genSeshId.js')
            res.cookie()
            res.send("<HTML><body><p>Hello " + user['name'] + "!</p></body></HTML>")
        } else {
            res.status(403)
            res.send("Login failed!")
        }
    }

});




module.exports = router;

