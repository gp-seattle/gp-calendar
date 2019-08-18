const fs = require('fs')
const cryptoJSON = require('crypto-json')
const keys = ['email', 'hashpass', 'name', 'year', 'isStudentLeader', 'isAdmin', 'gender', 'isValid']
const algorithm = 'aes256'
const encoding = 'hex'


//takes in an unencrypted list of users and writes an encrypted version to the users.json file
function encryptAll(users) {
    var password = require('./genPass')
    fs.writeFileSync('./data/password.json', JSON.stringify(password))

    //encrypts the data
    var encryptUsers = []
    for (i = 0; i < users.length; i++) {
        encryptUsers[i] = cryptoJSON.encrypt(users[i], password, algorithm, encoding, keys);
    }

    fs.writeFileSync('./data/users.json', JSON.stringify(encryptUsers));
    console.log("encrypted and written")
}


//exports a function
module.exports = encryptAll