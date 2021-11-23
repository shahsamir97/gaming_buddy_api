var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gamingbuddyteam@gmail.com',
        pass: 'Samir1997'
    }
});


exports.sendEmail = function (email, sendEmailCallback) {
    var mailOptions = {
        from: 'gamingbuddyteam@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, sendEmailCallback);

}


