const fs = require('fs')
const cryptoJSON = require('crypto-json')
const algorithm = 'aes256'
const encoding = 'hex'
const sessions = require('./../../data/sessions.json')

//takes in an unencrypted list of sessions and writes an encrypted version to the sessions.json file
function encryptAll(sessions) {
    var password = require('./genPass')
    fs.writeFileSync('./data/sessionsPass.json', JSON.stringify(password))

    //encrypts the data
    encryptSessions = cryptoJSON.encrypt(sessions, password, algorithm, encoding);

    fs.writeFileSync('./data/sessions.json', JSON.stringify(encryptSessions, null, 3));
}

//exports a function
module.exports = encryptAll