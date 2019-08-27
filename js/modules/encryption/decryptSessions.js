
const cryptoJSON = require('crypto-json')
const algorithm = 'aes256'
const encoding = 'hex'
var password = require('./../../data/sessionsPass.json')

//gets the encrypted user data
var encryptSession = require('./../../data/sessions.json')

//decrypts the data
var sessions = cryptoJSON.decrypt(encryptSession, password, algorithm, encoding);


//exports and unencrypted list of users
module.exports = sessions