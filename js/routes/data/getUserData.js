//imports express
const express = require('express')
const cookieParser = require('cookie-parser')
var xl = require('excel4node');
const fs = require('fs')


const router = express.Router();
router.use(cookieParser())



// handle incoming request to /users
router.get('/', (req, res, next) => {

    //gets the cookies
    var email = req.cookies.email;
    var seshId = req.cookies.seshId
    var validated = req.cookies.validated
    //checks cookies are valid
    if  (email && seshId && validated && checkSession(email, seshId)) {
        var users = require('./../../modules/encryption/decryptUsers.js')
        //checks if user is an admin
        if(isAdmin(email, users)) {
            //creates the excel file
            makeExcel(users).then(function() {
                //sends the file over
                res.download('./data/students.xlsx', err => {
                    if (err) {
                        console.log(err)
                    } else {
                        //deletes the file
                        fs.unlinkSync('./data/students.xlsx')
                    }
                });
            });
        } else {
            //handles user not being admin
            const error = new Error("Bad Requests");
            error.status = 403;
            error.message = "403 in get_user_data. User is not an admin";
            next(error);  
        }
    } else {
        const error = new Error("Bad Requests");
        error.status = 403;
        error.message = "403 in get_user_data. Missing cookies";
        next(error);  
    }
});


//checks if session is valid
function checkSession(email, id) {
    var sessions = require('./../../modules/encryption/decryptSessions.js')
    var found = false;
    for (index in sessions[email]) {
        if (sessions[email][index] == id) {
            found = true
            break;
        }
    }
    return found
}


//checks if user is admin
function isAdmin(email, users) {
    var admin = false
    for (index in users) {
        if(users[index]['email'] == email && users[index]['isAdmin']) {
            admin = true
        }
    }
    return admin
}

//takes in users and creates a temporary excel file with only non admin users
async function makeExcel(users) {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Students');
    var style = wb.createStyle({
        font: {
          color: '#FF0800',
          size: 12,
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    ws.cell(1, 1)
        .string('Name')
        .style(style)
    ws.cell(1, 2)
        .string('Year')
        .style(style)
    ws.cell(1, 3)
        .string('Gender')
        .style(style)  
    ws.cell(1, 4)
        .string('email')
        .style(style)

    var cell = 2;
    for (user in users) {
        if (users[user]['isStudentLeader'] == 'false' && users[user]['isAdmin'] == 'false') {
            ws.cell(cell, 1)
                .string(users[user]['name'])
                .style(style)
            ws.cell(cell, 2)
                .string(users[user]['year'])
                .style(style)
            ws.cell(cell, 3)
                .string(users[user]['gender'])
                .style(style)
            ws.cell(cell, 4)
                .string(users[user]['email'])
                .style(style)
            cell++
        }
    }

    await wb.writeToBuffer().then(buffer => {
        fs.writeFileSync('./data/students.xlsx', buffer);
    });

}

module.exports = router