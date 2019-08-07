//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();

const DATA_BACKUP = require('../calDataToJson')

var data = require('../calDataToJson')


//takes in a starting date and removes anything from data that isnt on or after the starting date
function startDate(start){
    removeLower(start, 'Date');

}

//takes in an end date and removes anything from data that isnt on or before the end date
function endDate(end){
    removeUpper(end, 'Date')
}


//takes in an earliest time and removes anything from data before then
function startTime(time) {
    removeLower(time, 'Start_Time')
}

function endTime(time) {
    removeUpper(time, 'End_Time')
}

//sets the lower bounds for data
function removeLower(limit, index) {
    var temp = []
    for (i = data.length - 1; i >= 0; i--) {
        if (parseInt(data[i][index]) >= limit) {
            temp.unshift(data[i])
        }
    }
    data = temp;
    temp = []
}

//sets the upper bound for the data
function removeUpper(limit, index) {
    var temp = []
    for (i = data.length - 1; i >= 0; i--) {
        if (parseInt(data[i][index]) <= limit) {
            temp.unshift(data[i])
        }
    }
    data = temp;
    temp = []
}   

// handle incoming request to /users
router.get('/', (req, res, next) => {
    var sdDef = false;
    var edDef = false;
    var stDef = false;
    var etDef = false;

    params = req.query
    //start and end dates
    if (params['Start_Date'] != undefined) {
        sdDef = true;
        startDate(params['Start_Date']);
    } else {
        sdDef = false;
    }

    if (params['End_Date'] != undefined) {
        edDef = true;
        console.log("Limiting End date")
        endDate(params['End_Date']);
    } else {
        edDef = false;
    }

    //start and end time
    if (params['Start_Time'] != undefined) {
        stDef = true;
        startTime(params['Start_Time']);
    } else {
        stDef = false;
    }
    if (params['End_Time'] != undefined) {
        etDef = true;
        endTime(params['End_Time']);
    } else {
        etDef = false;
    }

    console.log(data.length)
    
    //checks if time is valid
    if (sdDef && edDef && parseInt(params['End_Date']) < parseInt(params['Start_Date'])) {
        console.log("403")
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 End_Date is before Start"
        next(error);        
    } else if (stDef && etDef && parseInt(params['End_Time']) < parseInt(params['Start_Time'])) {
        console.log("403")
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 End_Date is before Start"
        next(error);  
    } else { 
        res.status(200)
        res.send(data);
    }

    //resets data for future queries
    data = DATA_BACKUP
});


module.exports = router;

