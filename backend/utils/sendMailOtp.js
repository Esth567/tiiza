const nodemailer = require('nodemailer');
require('dotenv').config();
const speakeasy = require('speakeasy');
const service = process.env;
async function sendMailOTP(options) {
  // generate otp secrete
  var secret = speakeasy.generateSecret({ length: 20 });

  // cache
  req.session.user_otp_auth = secret.base32;

  // Generate a time-based token based on the base-32 key.
  var token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    time: 600,
  });

  let transporter = nodemailer.createTransport({
    secure: true,
    host: service.EMAIL_HOST,
    port: service.EMAIL_PORT,
    auth: {
      user: service.EMAIL_SERVER_USERNAME,
      pass: service.EMAIL_SERVER_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: service.EMAIL_SERVER_USERNAME,
    to: email,
    subject: options.emailTitle,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP</title>
    </head>
    <body>
        <p>To authenticate,Please use the following One Time Password (OTP), it lasts for 10 minutes:</p>
        <br />
        <h2>${token}</h2>
    </body>`,
  };

  const isSent = await transporter.sendMail(mailOptions);
  return isSent;
}

module.exports = { sendMailOTP };
