//imports express
const express = require('express')

const fs = require('fs');



//acts sort of like a middleware with routing capabilities
const router = express.Router();

// handle incoming request to /users
router.get('/', (req, res, next) => {

    const writeMe = {
        "hello" : "world"
    }

    console.log(fs.readFileSync('./data/users.json', 'utf8'))
    console.log(writeMe)

    res.status(200)
    fs.writeFileSync('./data/users.json', JSON.stringify(writeMe ));
    
    res.send("b");
});




module.exports = router;

