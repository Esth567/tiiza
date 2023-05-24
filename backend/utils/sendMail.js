const nodemailer = require('nodemailer');
require('dotenv').config();
const service = process.env;
async function sendMail(options, callback) {
  console.log(options);
  console.log('----------------------------');
  // send an email to the user with a link that includes the reset token

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
    from: process.env.EMAIL_SERVER_USERNAME,
    to: options.email,
    subject: options.emailTitle,
    html: callback(options),
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
