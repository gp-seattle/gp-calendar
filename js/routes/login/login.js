//imports express
const express = require('express')
const cookieParser = require('cookie-parser')


const router = express.Router();
router.use(cookieParser())


// handle incoming request to /users
router.get('/', (req, res, next) => {
    //checks for current session
    if (req.cookies.seshId && req.cookies.email) {
        var sessions = require('./../../modules/encryption/decryptSessions.js')
        var userSessions = sessions[req.cookies.email]

        //checks if cookies are valid still
        var valid = false
        userSessions.forEach(element => {
            if (element == req.cookies.seshId) {
                valid = true;
            }
        });
        if (valid) {
            res.status(200)
            res.send("Success!")
        } else {
            res.status(403)
            res.send("Invalid cookies")
        }

    } else {
        //imports users
        var users = require('./../../modules/encryption/decryptUsers.js')

        //checks for required params
        if (!req.body.email) {
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 in login. Missing parameter: email";
            next(error);   
        } else if (!req.body.pass) {
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 in login. Missing parameter: pass";
            next(error);   
        } else {
            //checks that email is valid
            var user = null;
            for (i = 0; i < users.length; i++) {
                if (users[i]['email'] == req.body.email) {
                    user = users[i]

                    break;
                }
            }

            //generates new session and stores cookies
            if (req.body.pass === user['hashpass']) {
                res.status(200)
                var makeid = require ('./../../modules/encryption/genSeshId.js')
                var id = makeid(req.body.email)
                if(user['validated'] == 'true') {
                    res.cookie('validated', 'valid')
                }
                res.cookie('seshId', id)
                res.cookie('email', req.body.email)
                res.send("<HTML><body><p>Hello " + user['name'] + "!</p></body></HTML>")
            } else {
                //no email found
                res.status(403)
                res.send("Login failed!")
            }
        }
    }

});


module.exports = router;