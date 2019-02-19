// mailer.js

require("dotenv").config();
const nodemailer = require('nodemailer');

module.exports = {
    transporter: nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    }),
    mailOptions : {
      from: process.env.MAIL_FROM_ADDRESS
    }
}
