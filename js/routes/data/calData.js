//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

//acts sort of like a middleware with routing capabilities
const router = express.Router();
router.use(cookieParser())
var users = require('./../../modules/encryption/decryptUsers.js')

// handle incoming request to /users
router.get('/', (req, res, next) => {

    var data = require('./../../data/calData/A2F Gen Pub.json')['events']

    //checks that there are cookies
    if (req.cookies.email) {
        //false if user doesnt exist, otherwise is the user
        var user = getUser(req.cookies.email)

        var sessions = require('./../../modules/encryption/decryptSessions.js')
        var userSessions = sessions[req.cookies.email]

        //checks if cookies are valid still
        var valid = false
        userSessions.forEach(element => {
            if (element == req.cookies.seshId) {
                valid = true;
            }
        });

        if (user && valid) {
            if (user['gender'] == 'male' || user['gender'] == 'm') {
                if (user['year'] === 1 || user['year'] === 'frosh') {
                    data = require('./../../data/calData/A2F Frosh Bro.json')['events']
                } else {
                    data = require('./../../data/calData/A2F Soph Bro.json')['events']
                }
            } else {
                if (user['year'] === 1 || user['year'] === 'frosh') {
                    data = require('./../../data/calData/A2F Frosh Sis.json')['events']
                } else {
                    data = require('./../../data/calData/A2F Soph Sis.json')['events']
                }
            }
        } else {
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 in calData. Invalid cookies"
            next(error);
        }
    }
    

    //checks to see what params were passed
    var stDef = false;
    var etDef = false;

    params = req.body

    //start and end time
    if (params['startTime'] != undefined) {
        stDef = true;
        data = startTime(Date.parse(params['startTime']), data);
    }
    if (params['endTime'] != undefined) {
        etDef = true;
        data = endTime(Date.parse(params['endTime']), data);
    }

    //checks for a valid call before replying with a status code
    if (stDef && etDef && parseInt(params['endTime']) < parseInt(params['startTime'])) {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in calData. endTime is before startTime"
        next(error);
    } else {
        res.status(200)
        res.send(data);
    }
});


//sets the lower bounds for data
function startTime(time, data) {
    var temp = []
    for (i = data.length - 1; i >= 0; i--) {
        if (Date.parse(data[i]['startTime']) >= time) {
            temp.unshift(data[i])
        }
    }
    return temp
}

//sets the upper bound for the data
function endTime(time, data) {
    var temp = []
    for (i = data.length - 1; i >= 0; i--) {
        if (Date.parse(data[i]['endTime']) <= time) {
            temp.unshift(data[i])
        }
    }
    return temp
}

function getUser(email) {

    for (index in users) {
        if (users[index]['email'] === email) {
            return users[index]
        }
    }
    return false
}


module.exports = router;

