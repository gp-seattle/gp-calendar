//import express
const express = require('express');
//creates a new express application called app. This is what is sent off to any file that calls this one
const app = express();
//imports the rate limiter
const rateLimit = require("express-rate-limit");
//import morgan package
const morgan = require('morgan');
//imports body parser package
const bodyParser = require('body-parser');
//sets up api endpoints
const ordersRoutes = require('./routes/orders')
const loginRoutes = require('./routes/login/login')
const apiDocsRoutes = require('./routes/api_docs')
const cal_dataRoutes = require('./routes/cal_data')
const create_accountRoutes = require('./routes/create_account')
const validate_accountRoutes = require('./routes/validateAccount.js')

//gets calendar data in json format
const data = require('./modules/calDataToJson')

/*TODO
    -Create endpoints
    -finish error codes
        -403?
        -401
        -429 vs 420?
    -login system
        -schema
            -email
            -uuid
            -pass
        -secure storage
            -hash and salt
*/







//enables cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: // message to be displayed when rate limit is reached
    '429 too many requests'
});
 
// apply to all requests
app.use(limiter);

//lets the app use morgan in dev mode
app.use(morgan('dev'));

//lets the app use the body parser to parse the 
//  this one is specifically for strings and arrays
app.use(bodyParser.urlencoded({extended:true}));
//  and this one is sepecifically for json files
app.use(bodyParser.json());

//get routes for endpoints
app.use('/orders', ordersRoutes)
app.use('/login', loginRoutes);
app.use('/api_docs', apiDocsRoutes);
app.use('/cal_data', cal_dataRoutes);
app.use('/validate_account', validate_accountRoutes);
app.use('/create_account', create_accountRoutes);



//handles 404 not found
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    error.message = "404 not found"
    next(error);
});

//handles internal server error
app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
});

//exports app 
//  this sends app over to server.js

module.exports = app;