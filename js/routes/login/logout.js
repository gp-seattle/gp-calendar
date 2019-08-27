//imports express
const express = require('express')
const cookieParser = require('cookie-parser')

const fs = require('fs');

//acts sort of like a middleware with routing capabilities
const router = express.Router();
router.use(cookieParser())



// handle incoming request to /users
router.delete('/', (req, res, next) => {
    var sessions = require('./../data/sessions.json')
    var sessionIds = sessions[req.cookies.email]

    sessionIds.splice(sessionIds.indexOf(req.cookies.seshId), 1)

    fs.writeFileSync('./data/sessions.json', JSON.stringify(sessions, null, 3));
    
    res.cookie('seshId', 'null', {maxAge: 0})
    res.cookie('seshId', 'null', {maxAge: 0})
    res.status(200)
    res.send("route setup properly")
    
});




module.exports = router;

