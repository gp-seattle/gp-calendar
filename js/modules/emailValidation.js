var nodemailer = require('nodemailer');

var url = "localhost:3100/validate_account?email=email3"
var text = "<p>Click <a href=\"http://184.98.142.80:3100/validate_account?email=email3\">here</a> to confirm your email"


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'otsuka.wyatt@gmail.com',
      pass: 'otsuka519667'
    }
  });
  
  var mailOptions = {
    from: 'otsuka.wyatt@gmail.com',
    to: 'wyatt.otsuka@gmail.com',
    subject: 'Sending Email using Node.js',
    html: text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });