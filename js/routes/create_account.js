//TODO: Find a better way to secure the password var.
//current solution is to generate a new password each time
//potential idea: use password only for cold start. generate new password each time?
//    -how will this password be stored in case of an error?
//    -backup data stored with a personal password?
//      -how will the code know the password?


//encrypts data before storing it in a json
const cryptoJSON = require('crypto-json')

const fs = require('fs');

var output

//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();


// handle incoming request to /users
router.all('/', (req, res, next) => {

  var params = req.body;

  //sets up vars to encrypt data
  const keys = ['email', 'hashpass', 'name', 'year', 'isStudentLeader', 'isAdmin', 'gender']
  const algorithm = 'aes256'
  const encoding = 'hex'
  var password = require('./../data/password')

  //gets the encrypted user data
  var encryptUsers = require('./../data/users')


  //decrypts the data
  var users = []
  for (i = 0; i < encryptUsers.length; i++) {
    users[i] = cryptoJSON.decrypt(encryptUsers[i], password, algorithm, encoding, keys);
  }

  console.log(users)

  //ensures there are all required keys
  var valid = true;
  for (key in keys) {

    if (params[keys[key]] == undefined) {
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
      'hashpass' : params['hashpass'],
      'name' : params['name'],
      'year' : params['year'], 
      'isStudentLeader' : params['isStudentLeader'],
      'isAdmin' : params['isAdmin'],
      'gender' : params['gender']
    }
     
    password = require('./../modules/genPass')
    fs.writeFileSync('./data/password.json', JSON.stringify(password));

    console.log(password)

    for (i = 0; i < users.length; i++) {
      output = cryptoJSON.encrypt(
        newAcc, password, {encoding, keys, algorithm}
      )
      encryptUsers[i] = output
    }

    res.status(200)
    fs.writeFileSync('./data/users.json', JSON.stringify(encryptUsers));
    res.end()
  }

  //writes the encrypted data to the user file

  function containsEmail(container, email) {
    for (i = 0; i < container.length; i++) {
      if (users[i]['email'] == email) {
        return true;
      }
    }
    return false;
  }

});





module.exports = router;

