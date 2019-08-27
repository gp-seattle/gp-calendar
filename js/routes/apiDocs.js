//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();
 

const users = require('./../data/api_docs');

//sets up the html code
var bodyOpen = "<HTML><head><title>Backend API documentation</title></head><body>"

//closes off all the html tags
var bodyClose = "</body></HTML>"

var core = ""
for (key in users) {
    core += "<p><b>" + key 
    for (subheading in users[key]) {
        core += "</b><br>&emsp;" + users[key][subheading]
    }
    core += "</p>";
    
}


// handle incoming request to /users
router.get('/', (req, res, next) => {
    res.status(200)
    res.send(bodyOpen + core + bodyClose)
});

module.exports = router;
