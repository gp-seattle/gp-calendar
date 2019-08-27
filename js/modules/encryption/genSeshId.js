var ids = require('./decryptSessions.js')

//creates a new session and inserts it into the current sessions
function setSesh(email) {
    token = makeid(32);
    if (ids[email]) {
        ids[email].push(token)
    } else {
        ids[email] = [token]
    }

    //encrypts and saves the sessions
    var encryptAll = require('./encryptSessions.js')
    encryptedIds = encryptAll(ids)

    return token
}

//makes a random id of length length
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = setSesh