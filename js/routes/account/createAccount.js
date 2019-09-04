//TODO: Find a better way to secure the password var.
//current solution is to generate a new password each time
//potential idea: use password only for cold start. generate new password each time?
//    -how will this password be stored in case of an error?
//    -backup data stored with a personal password?
//      -how will the code know the password?



//imports express
const express = require('express')

//acts sort of like a middleware with routing capabilities
const router = express.Router();
const paramsNeeded = ['email', 'hashpass', 'name']
var users = require('./../../modules/encryption/decryptUsers')


// handle incoming request to /users
router.post('/', (req, res, next) => {

  var params = req.body;

  //ensures there are all required keys
  var valid = true;
  var paramMissing = "";
  for (key in paramsNeeded) {
    if (params[paramsNeeded[key]] == undefined) {
      valid = false;
      paramMissing = paramsNeeded[key]
    }
  }

  if (!valid) {     //error for missing keys
    const error = new Error("Bad Requests");
    error.status = 403;
    error.message = "403 in create_account. Missing parameter: " + paramMissing;
    next(error);    
      
  } else if (containsEmail(users, params['email'])){     //errors for existing account
    const error = new Error("Bad Requests");
    error.status = 403;
    error.message = "403 in create_account. Account already exists with given email"
    next(error);    
  } else {     //valid request

    //ensures only valid emails get admin
    var admin = params['email'].endsWith('@gpmail.org').toString()

    //allows for gender to be input as an option
    gender = ''
    if (params['gender']) {
      gender = params['gender']
    }


    //creates new account info
    var newAcc = {
      'email' : params['email'],
      'hashpass' : params['hashpass'],
      'name' : params['name'],
      'year' : '', 
      'isStudentLeader' : '',
      'isAdmin' : admin,
      'gender' : '',
      'validated' : 'false'
    }

    users[users.length] = newAcc

    var encryptAll = require('./../../modules/encryption/encryptUsers.js')

    encryptAll(users)
    
    res.status(200)
    res.end()
  }

  //checks if email is in container
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

