//import express
const express = require('express');
//creates a new express application called app. This is what is sent off to any file that calls this one
const app = express();

//impots packages
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
const bodyParser = require('body-parser');

//sets up api endpoints
const ordersRoutes = require('./routes/orders')
const loginRoutes = require('./routes/login/login')
const apiDocsRoutes = require('./routes/apiDocs')
const calDataaRoutes = require('./routes/data/calData')
const createAccountRoutes = require('./routes/account/createAccount')
const validateAccountRoutes = require('./routes/account/validateAccount')
const logoutRoute = require('./routes/login/logout')
const getUserDataRoute = require('./routes/data/getUserData')

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
  windowMs: 1000,
  max: 10, // limit each IP to 100 requests per windowMs
  message: // message to be displayed when rate limit is reached
    '429 too many requests'
});

//applies all the packages
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({extended:true}),
    limiter,
    morgan('dev'),
);

//get routes for endpoints
app.use('/orders', ordersRoutes)
app.use('/login', loginRoutes);
app.use('/api_docs', apiDocsRoutes);
app.use('/cal_data', calDataaRoutes);
app.use('/validate_account', validateAccountRoutes);
app.use('/create_account', createAccountRoutes);
app.use('/logout', logoutRoute);
app.use('/get_user_data', getUserDataRoute);

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