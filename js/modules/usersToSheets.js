var localUsers = require('./encryption/decryptUsers.js')
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
//password = 6s%g#OrqoE^L
//id = 1_AFrGJ2e4G8QJoKeZ3GoNn-WVwVMeGrIoK-_IJil0qM


var doc = new GoogleSpreadsheet('1_AFrGJ2e4G8QJoKeZ3GoNn-WVwVMeGrIoK-_IJil0qM');
var sheet;

 
module.exports = async.series([
    function setAuth(step) {
        //sets up credentials
        var creds = require('./../data/gp-sea-calendar-f5ec86252100.json');

        doc.useServiceAccountAuth(creds, step);
    },
    //gets the spreadsheet
    function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Loaded doc: '+info.title+' by '+info.author.email);
                sheet = info.worksheets[0];
                console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
                var lastUpdate = require('./../data/lastUpdate.json')
                var pullDate = new Date(lastUpdate);
                var sheetUpdate = new Date(info.updated);
                console.log("Sheet: " + sheetUpdate)
                console.log("Last pull: " + pullDate)
                //true if sheet is ahead
                pullNewUpdate(sheet, value=>{
                    console.log(value);
                })
                if(sheetUpdate > pullDate)
                    //pull new updates
                    //update users
                    //create new user
                    //push to sheets
                    //update lastupdate.json
                step();
            }
        });
    },
    //checks to see if the sheet is ahead of local files
    function checkUpdates(step) {
        step()
    },
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});

//pulls data from the sheet to update the json file
function pullNewUpdate(sheet, step) {
    var encryptUsers = require('./encryption/encryptUsers')
    getAllCells(function(print) {
        step(print)
    })

    async function getAllCells(step) {

        //gets the cells from the sheet
        const minRow = 3
        const maxRow = 256
        const minCol = 1
        const maxCol = 4
        sheet.getCells({
            'min-row' : minRow,
            'max-row' : maxRow,
            'min-col' : minCol,
            'max-col' : maxCol,
            'return-empty' : true
        }, function(err, cells){
            if (err) {
                console.log(err)
            } else {

                var filledCellsSize = maxCol * maxRow
                //cuts cells down to a smaller size
                for(i = 0; i < maxRow; i += 4) {
                    if(cells[i*4].value == '') {
                        filledCellsSize = i*4
                        break;
                    }
                }

                //fills out any new data
                for(i = 0; i < filledCellsSize / 4; i++) {
                    //checks that there is data to fill before looking for the user 
                    if (
                        cells[1 + i*4].value != '' ||
                        cells[2 + i*4].value != '' ||
                        cells[3 + i*4].value != ''
                    ) {
                        var found = findLocalUser(cells[i*4].value)
                        //checks that it returned true and not just that it exists
                        if (found !== true) {
                            //fills out user with all info
                            localUsers[found]['name'] = cells[i*4].value,
                            localUsers[found]['year'] = cells[1 + i*4].value
                            localUsers[found]['gender'] = cells[2 + i*4].value
                            localUsers[found]['isStudentLeader'] = cells[3 + i*4].value
                        }
                    }
                }

                //sorts users
                localUsers.sort((a,b) =>{
                    if (a['name'] < b['name']) {
                        return -1 
                    } else if (a['name'] === b['name']) {
                        return 0
                    } else {
                        return 1
                    }
                })

                //syncs the sheets cells to the localUsers
                for (index in localUsers){
                    cells[index * 4].value = localUsers[index]['name']
                    cells[1 + index * 4].value = localUsers[index]['year']
                    cells[2 + index * 4].value = localUsers[index]['gender']
                    cells[3 + index * 4].value = localUsers[index]['isStudentLeader']
                    
                }

                sheet.bulkUpdateCells(cells)
                step("done")
            }
        })
    }


    //Returns true if user is found and their localUsers index if not
    function findLocalUser(name) {
        for (index in localUsers) {
            //finds user
            if (localUsers[index]['name'] === name) {
                //checks if their data is complete
                if(
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
        Console.log("User Not Found")
    }

    
}