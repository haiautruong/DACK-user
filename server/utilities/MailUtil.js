const nodemailer = require('nodemailer');

const secureOption = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'scttshopv2@gmail.com',
        pass: 'Icedestyn123'
    }
};

const transporter = nodemailer.createTransport(secureOption);

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("### Mail Server Connected ###");
    }
});

module.exports = transporter;
