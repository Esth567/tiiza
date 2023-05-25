const speakeasy = require('speakeasy');
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const { sendMailOTP } = require('../../utils/sendMailOtp');
const { createCustomError } = require('../../middleware/customError');
const { logger } = require('../../utils/winstonLogger');
const { sendSMSOtp } = require('../../utils/sendSMSOtp');
const { PhoneValidator, EmailValidator } = require('../../validation/validation');
require('dotenv').config();

//========================================================== || EMAIL OTP VALIDATION  || ===================================================================

const emailOtpValidationCtrl = asyncWrapper(async (req, res, next) => {
  const requestId = res.getHeader('X-request-Id');
  const { token } = req.body;
  if (!token) return next(createCustomError('Input cannot be empty', 400));
  if (!req.session.user_otp_auth || !req.session.user_details)
    return next(createCustomError('Sorry You are not authorized to access this resource', 401));
  const secret = req.session?.user_otp_auth;
  // verify otp
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    time: 600,
  });

  if (!verified) return next(createCustomError('Invalid OTP', 400));
  const { password, phone, email, full_name, location, user_role } = req.session.user_details;
  const createdUser = await UserModel.create({
    full_name,
    email,
    phone,
    password,
    location,
    user_role: user_role ? 2003 : 2001,
  });

  if (!Object.values(createdUser.dataValues).length > 0) {
    logger.error(`Failed to Create User`, {
      module: 'OTPController.js',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      method: req.method,
      path: req.path,
      action: 'Create user',
      statusCode: 500,
      clientIp: req.clientIp,
    });
    return next(createCustomError('Sorry, Something went wrong,please try again', 500));
  }

  req.session.user_details = {};
  req.session.user_otp_auth = '';
  return res.status(201).json({ success: true, payload: createdUser });
});

//========================================================== || SMS OTP VALIDATION  || ===================================================================

const smsOtpValidationCtrl = asyncWrapper(async (req, res, next) => {
  const requestId = res.getHeader('X-request-Id');

  const { token } = req.body;
  if (!token) return next(createCustomError('Input cannot be empty', 400));
  const secret = req.session?.user_otp_auth;
  if (!req.session.user_otp_auth || !req.session.user_details)
    return next(createCustomError('Sorry You are not authorized to access this resource', 401));
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    time: 600, //last for 10 mins
  });

  const { email } = req.session.user_details;
  const user = req.session.user_details;
  if (!verified) return next(createCustomError('Invalid OTP', 400));

  const updateUser = await UserModel.update({ is_verified: true }, { where: { email } });
  if (!updateUser[0]) {
    logger.error(`Failed to Update phone number |`, {
      module: 'OTPController.js',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      action: 'Update phone number',
      method: req.method,
      path: req.path,
      statusCode: 500,
      clientIp: req.clientIp,
    });
    return next(createCustomError('Sorry, something went wrong.Please try again later', 500));
  }
  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    req.session.user_details = {};
    req.session.user_otp_auth = '';
    return res.status(200).send({ success: true, payload: 'Login successful' });
  });
});
//========================================================== || REQUEST EMAIL OTP VALIDATION  || ===================================================================

const requestOtpCtrl = asyncWrapper((req, res, next) => {
  const requestId = res.getHeader('X-request-Id');
  const { email } = req.body;

  const { error } = new EmailValidator(email).validate();
  if (error) return next(createCustomError(error.message, 400));
  sendMailOTP(email, req)
    .then((response) => {
      return res.status(200).json({
        success: true,
        payload: {
          message: `OTP has been sent to ${email}`,
          authUrl: '/validate-otp',
        },
      });
    })
    .catch((error) => {
      logger.error(`${error.message}`, {
        module: 'OTPController.js',
        userId: req.user ? req.user.user_id : null,
        requestId: requestId,
        action: 'Send mail',
        method: req.method,
        path: req.path,
        statusCode: 500,
        clientIp: req.clientIp,
      });
      return next(
        createCustomError(`System is unable to send Otp to ${email}. please try again later`, 500)
      );
    });
});

//========================================================== || SMS OTP VALIDATION  || ===================================================================

const requestSMSOtpCtrl = asyncWrapper((req, res, next) => {
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const requestId = res.getHeader('X-request-Id');
  const { phone } = req.body;

  const { error } = new PhoneValidator(phone).validate();
  if (error) return next(createCustomError(error.message, 400));
  sendSMSOtp(fromNumber, phone, req)
    .then((_) => {
      return res.status(200).json({
        success: true,
        payload: {
          message: `OTP has been sent to ${phone}`,
          authUrl: '/customer/validate-sms-otp',
        },
      });
    })
    .catch((error) => {
      logger.error(`${error.message}`, {
        module: 'OTPController.js',
        userId: req.user ? req.user.user_id : null,
        requestId: requestId,
        action: 'Send SMS',
        method: req.method,
        path: req.path,
        statusCode: 500,
        clientIp: req.clientIp,
      });
      return next(
        createCustomError(`System is unable to send Otp to ${phone}. please try again later`, 500)
      );
    });
});

module.exports = {
  emailOtpValidationCtrl,
  smsOtpValidationCtrl,
  requestSMSOtpCtrl,
  requestOtpCtrl,
};
