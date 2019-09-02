var time = Date.now()

var localUsers = require('./encryption/decryptUsers.js')
var encryptUsers = require('./encryption/encryptUsers')

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

//password = 6s%g#OrqoE^L
//id = 1_AFrGJ2e4G8QJoKeZ3GoNn-WVwVMeGrIoK-_IJil0qM


var doc = new GoogleSpreadsheet('1_AFrGJ2e4G8QJoKeZ3GoNn-WVwVMeGrIoK-_IJil0qM');
var sheet;

//create new user
//save new user
//pull all users
//fills out new data from the sheet
//fills in the sheet with all up to date data

//new user should already be in the database
function runMe(err, callback) {
    async.series([
        //authorized the gpbot to access the file
        function setAuth(step) {
            //sets up credentials
            var creds = require('./../data/gp-sea-calendar-f5ec86252100.json');

            doc.useServiceAccountAuth(creds, step);
        },
        //gets the spreadsheet
        function getInfoAndWorksheets(step) {
            doc.getInfo(function (err, info) {
                if (err) {
                    console.log(err)
                } else {

                    sheet = info.worksheets[0];

                    //true if sheet is ahead
                    pullNewUpdate(sheet, value => {
                        console.log(value)
                        encryptUsers(value);
                    })
                    step();
                }
            });
        },
        //checks to see if the sheet is ahead of local files
        function checkUpdates(step) {
            step()
        },
    ], function (err) {
        if (err) {
            console.log('Error: ' + err);
            callback(err);
        }
    });

    //pulls data from the sheet to update the json file
    function pullNewUpdate(sheet, step) {
        getAllCells(function (print) {
            step(localUsers)
        })

        async function getAllCells(step) {

            //gets the cells from the sheet
            const minRow = 3
            const maxRow = 256
            const minCol = 1
            const maxCol = 4
            sheet.getCells({
                'min-row': minRow,
                'max-row': maxRow,
                'min-col': minCol,
                'max-col': maxCol,
                'return-empty': true
            }, function (err, cells) {
                if (err) {
                    console.log(err)
                } else {

                    var filledCellsSize = maxCol * maxRow
                    //finds last cell
                    for (i = 0; i < maxRow; i += 4) {
                        if (cells[i * 4].value == '') {
                            filledCellsSize = i * 4
                            break;
                        }
                    }

                    //fills out any new data
                    for (i = 0; i < filledCellsSize / 4; i++) {
                        //checks that there is data to fill before looking for the user 
                        if (
                            cells[1 + i * 4].value != '' ||
                            cells[2 + i * 4].value != '' ||
                            cells[3 + i * 4].value != ''
                        ) {
                            var found = findLocalUser(cells[i * 4].value)
                            //checks that it returned true and not just that it exists
                            if (found !== true) {
                                //fills out user with all info
                                localUsers[found]['name'] = cells[i * 4].value,
                                localUsers[found]['year'] = cells[1 + i * 4].value
                                localUsers[found]['gender'] = cells[2 + i * 4].value
                                localUsers[found]['isStudentLeader'] = cells[3 + i * 4].value
                            }
                        }
                    }

                    //sorts users
                    localUsers.sort((a, b) => {
                        if (a['name'] < b['name']) {
                            return -1
                        } else if (a['name'] === b['name']) {
                            return 0
                        } else {
                            return 1
                        }
                    })

                    //syncs the sheets cells to the localUsers
                    for (index in localUsers) {
                        cells[index * 4].value = localUsers[index]['name']
                        cells[1 + index * 4].value = localUsers[index]['year']
                        cells[2 + index * 4].value = localUsers[index]['gender']
                        cells[3 + index * 4].value = localUsers[index]['isStudentLeader']

                    }

                    //wipes all empty cells
                    for (i = filledCellsSize; i < cells.size; i++) {
                        cells[i].value = ''
                    }

                    sheet.bulkUpdateCells(cells)
                    step(localUsers)
                }
            })
        }


        //Returns true if user is completed and their localUsers index if not
        function findLocalUser(name) {
            for (index in localUsers) {
                //finds user
                if (localUsers[index]['name'] === name) {
                    //checks if their data is complete
                    if (
                        localUsers[index]['year'] == '' ||
                        localUsers[index]['gender'] == '' ||
                        localUsers[index]['isStudentLeader'] == ''
                    ) {
                        return true;
                    } else {
                        return index;
                    }
                }
            }
            console.log("User Not Found")
        }
    }
}

//module.exports = runMe()