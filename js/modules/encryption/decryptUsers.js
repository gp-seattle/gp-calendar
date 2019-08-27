const cryptoJSON = require('crypto-json')
const keys = ['email', 'hashpass', 'name', 'year', 'isStudentLeader', 'isAdmin', 'gender', 'isValid']
const algorithm = 'aes256'
const encoding = 'hex'
var password = require('./../../data/usersPass')

//gets the encrypted user data
var encryptUsers = require('./../../data/users')


//decrypts the data
var users = []
for (i = 0; i < encryptUsers.length; i++) {
  users[i] = cryptoJSON.decrypt(encryptUsers[i], password, algorithm, encoding, keys);
}

//exports and unencrypted list of users
module.exports = users
