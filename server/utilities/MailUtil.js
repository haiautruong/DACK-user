const nodemailer = require('nodemailer');

const option = {
    service: 'gmail',
    auth: {
        user: 'scttshopv2@gmail.com', // email hoặc username
        pass: 'Icedestyn123' // password
    }
};
const transporter = nodemailer.createTransport(option);

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("### Mail Server Connected ###");
    }
});

module.exports = transporter;
