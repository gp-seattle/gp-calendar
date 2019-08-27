//changes the validated value of a user to true when the api is called
const express = require('express')
const router = express.Router();
var encryptUsers = require('./../../modules/encryption/encryptUsers')


router.put('/', (req, res, next) => {
    var users = require('../../modules/encryption/decryptUsers')
    var done = false
    for (user in users) {
        if(users[user]['email'] == req.query.email) {
            users[user]['validated'] = "true";
            done = true
        }
    }

    encryptUsers(users)
    if (done) {
        res.sendStatus(200);
    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 User not found"
        next(error); 
    }
});

module.exports = router
