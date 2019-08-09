//encrypts data before storing it in a json
const cryptoJSON = require('crypto-json')
const algorithm = 'camellia-128-cbc'
const encoding = 'hex'

const fs = require('fs');


//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();

//sets up vars to encrypt data
const keys = ['email', 'pass', 'name', 'grade', 'isStudentLeader', 'isAdmin', 'gender']
const algorithm = 'aes256'
const encoding = 'hex'
const password = require('./../data/password.txt')

var encryptUsers = require('./../data/users')

var users = cryptoJSON.decrypt(encryptUsers, password, algorithm, encoding, keys);

// handle incoming request to /users
router.get('/', (req, res, next) => {

  var params = req.query;

  //ensures there are all required keys
  var valid = true;
  for (key in keys) {
    if (params[key] == undefined) {
      valid = false;
    }
  }


  if (!valid) {     //error for missing keys
    const error = new Error("Bad Requests");
    error.status = 403;
    error.message = "403 Missing required parameter"
    next(error);   
  } else if (containsEmail(users, params['email'])){     //errors for existing account
    const error = new Error("Bad Requests");
    error.status = 403;
    error.message = "403 Account already exists with given email"
    next(error);    
  } else {     //valid request

    //creates new account info
    var newAcc = {
      'email' : params['email'],
      'pass' : params['pass'],
      'name' : params['name'],
      'grade' : params['grade'], 
      'isStudentLeader' : params['isStudentLeader'],
      'isAdmin' : params['isAdmin'],
      'gender' : params['gender']
    }


    const output = cryptoJSON.encrypt(
      newAcc, password, {encoding, keys, algorithm}
    )

      res.status(200)
      console.log(req)
  }

  //writes the encrypted data to the user file
  fs.writeFileSync('./../data/users', output);

});

function containsEmail(container, email) {
  for (user in container) {
    if (user['email'] == email) {
      return true;
    }
  }
  return false;
}


module.exports = router;

