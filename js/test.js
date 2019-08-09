const cryptoJSON = require('crypto-json')

//sets up vars to encrypt data
const keys = ['test1', 'test2']
const algorithm = 'aes256'
const encoding = 'hex'
const password = require('./data/password')

const fs = require('fs');


/*{ 
    "test1": "encryptme", 
    "test2": "encrypt me too!"
}*/

var testfile = require('./data/test')

var encryptUsers = cryptoJSON.encrypt(testfile, password, algorithm, encoding, keys);

console.log(encryptUsers)

//fs.writeFileSync('./data/test.json', JSON.stringify(encryptUsers));

//var decryptUsers = cryptoJSON.decrypt(testfile, password, algorithm, encoding, keys);
//fs.writeFileSync('./data/test.json', JSON.stringify(decryptUsers));