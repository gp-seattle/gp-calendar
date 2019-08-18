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
const paramsNeeded = ['email', 'hashpass', 'name', 'year', 'isStudentLeader', 'gender']
var users = require('./../modules/decryptUsers')

// handle incoming request to /users
router.post('/', (req, res, next) => {

  var params = req.body;

  //ensures there are all required keys
  var valid = true;
  for (key in paramsNeeded) {
    if (params[paramsNeeded[key]] == undefined) {
      valid = false;
    }
  }

  if (!valid) {     //error for missing keys
    
      
  } else if (containsEmail(users, params['email'])){     //errors for existing account
    const error = new Error("Bad Requests");
    error.status = 403;
    error.message = "403 Account already exists with given email"
    next(error);    
  } else if (!params['email'].endsWith('@gpmail.org') && params['isAdmin'] == 'true') {
    const error = new Error("Bad Requests");
    error.status = 403;
    error.message = "403 Email is not valid for an admin account"
    next(error);   
  } else {     //valid request

    var admin = params['email'].endsWith('@gpmail.org').toString()

    //creates new account info
    var newAcc = {
      'email' : params['email'],
      'hashpass' : params['hashpass'],
      'name' : params['name'],
      'year' : params['year'], 
      'isStudentLeader' : params['isStudentLeader'],
      'isAdmin' : admin,
      'gender' : params['gender'],
      'validated' : "false"
    }

    users[users.length] = newAcc

    var encryptAll = require('./../modules/encryptUsers.js')

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

