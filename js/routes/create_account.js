//encrypts data before storing it in a json
const cryptoJSON = require('crypto-json')
const algorithm = 'camellia-128-cbc'
const encoding = 'hex'

var newAcc = {
    'email' : '',
    'pass' : '',
    'name' : '',
    'grade' : 0, 
    'isStudentLeader' : false,
    'isAdmin' : false,
    'gender' : ''
}

const keys = ['email', 'pass', 'name', 'grade', 'isStudentLeader', 'isAdmin', 'gender']
const algorithm = 'aes256'
const encoding = 'hex'
 
const output = cryptoJSON.encrypt(
  input, password, {encoding, keys, algorithm}
)