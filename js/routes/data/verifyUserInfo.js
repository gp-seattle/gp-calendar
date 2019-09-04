//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const router = express.Router();
router.use(cookieParser())

// handle incoming request
router.get('/', (req, res, next) => {

    valid = validateCall(req)

    valid = true;
    //ensures returned true and not just exists
    if (valid === true) {

        var users = require('../../modules/encryption/decryptUsers.js')

        var userData = []
        for (index in users) {
            var tempUser = {}
            tempUser['name'] = users[index]['name']
            tempUser['email'] = users[index]['email']
            tempUser['year'] = users[index]['year']
            tempUser['gender'] = users[index]['gender']
            tempUser['isStudentLeader'] = users[index]['isStudentLeader']
            userData.push(tempUser)
        }

        userData.sort((a, b) => {
            var aName = a['name'].toLowerCase()
            var bName = b['name'].toLowerCase()
            if (aName > bName) {
                return 1;
            } else if (aName < bName) {
                return -1
            } else {
                return 0
            }
        });


        res.send(JSON.stringify(userData))

    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in verifyUserInfo. " + valid;
        next(error);
    }

});


router.put('/', (req, res, next) => {

    valid = validateCall(req);

    valid = true;
    //ensures returned true and not just exists
    if (valid === true) {
        var users = require('../../modules/encryption/decryptUsers.js')
        for (reqIdx in req.body) {
            for (useIdx in users) {
                if (users[useIdx]['email'] == req.body[reqIdx]['email']) {
                    users[useIdx]['isStudentLeader'] = req.body[reqIdx]['isStudentLeader']
                    users[useIdx]['year'] = req.body[reqIdx]['year']
                    users[useIdx]['gender'] = req.body[reqIdx]['gender']
                }
            }
        }

        var encryptAll = require('../../modules/encryption/encryptUsers.js')
        encryptAll(users)
        res.status(200)
        res.send("Success")
    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in verifyUserInfo. " + valid;
        next(error);
    }

});





function validateCall(req) {

    //checks that proper cookies exist
    if (req.cookies.email && req.cookies.seshId && req.cookies.validated) {

        //checks that the seshId is valid
        var sessions = require('../../modules/encryption/decryptSessions.js')
        var userSessions = sessions[req.cookies.email]
        validSesh = false
        userSessions.forEach(element => {
            if (element == req.cookies.seshId) {
                validSesh = true;
            }
        });

        if (validSesh) {

            //checks that the user is valid
            var users = require('../../modules/encryption/decryptUsers.js')
            validUser = false
            for (index in users) {
                console.log(users[index])
                if (users[index]['email'] == req.cookies.email) {
                    validUser = true;
                    break;
                }
            }
            if (validUser) {
                return true
            } else {
                return "Invalid account details"
            }
        } else {
            return "Invalid cookies"
        }
    } else {
        return "Missing cookies"
    }
}



module.exports = router;

