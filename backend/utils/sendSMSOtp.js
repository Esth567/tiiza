const asyncWrapper = require('../middleware/asyncWrapper');
require('dotenv').config();
const speakeasy = require('speakeasy');
const {sendSMS} = require('../services/twilioConfig');
require('dotenv').config();
const service = process.env;
async function sendSMSOtp(fromNumber, toNumber, req) {
  // generate otp secrete
  var secret = speakeasy.generateSecret({length: 20});
  console.log(secret.base32);

  // cache
  req.session.user_otp_auth = secret.base32;

  var token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    time: 600,
  });

  const isSent = sendSMS(
    fromNumber,
    toNumber,
    `Your One Time Verification Code (OTP) is: ${token}.Do not share with any one.Do not share this code with others `,
  );
  return isSent;
}

module.exports = {sendSMSOtp};
