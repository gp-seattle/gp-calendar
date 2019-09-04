//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const router = express.Router();
router.use(cookieParser())

// handle incoming request
router.delete('/', (req, res, next) => {

    //checks if cookies are valid
    if (req.cookies.email && req.cookies.seshId) {
        var sessions = require('./../../modules/encryption/decryptSessions.js')
        var userSessions = sessions[req.cookies.email]
        //validates session
        var validSesh = false
        userSessions.forEach(element => {
            if (element == req.cookies.seshId) {
                validSesh = true;
            }
        });
        if (validSesh) {
            //validates user
            var users = require('./../../modules/encryption/decryptUsers.js')
            user = false
            for (index in users) {
                if (users[index]['email'] == req.body.email) {
                    user = index;
                    break;
                }
            }
            if (user && req.body.pass == users[user]['hashpass']) {
                //all clear for delete
                users.splice(user, 1);
                var encryptUsers = require('./../../modules/encryption/encryptUsers.js')
                var encryptSessions = require('./../../modules/encryption/encryptSessions.js')

                encryptUsers(users)
                delete sessions[req.cookies.email]
                encryptSessions(sessions)

                res.status(200)
                res.send("Account deleted")
            } else {
                const error = new Error("Bad Requests");
                error.status = 403;
                error.message = "403 in delete_account. Invalid account details";
                next(error);
            }
        } else {
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 in delete_account. Invalid cookies";
            next(error);
        }
    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in delete_account. Missing cookies";
        next(error);
    }
});


module.exports = router;