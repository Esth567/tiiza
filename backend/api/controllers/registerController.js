const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const {HashPassword} = require('../../authentication/password');
const {RegisterValidator} = require('../../validation/validation');
const {createCustomError} = require('../../middleware/customError');
const {sendMailOTP} = require('../../utils/sendMailOtp');
const {logger} = require('../../utils/winstonLogger');

require('dotenv').config();

const registerController = asyncWrapper(async (req, res, next) => {
  const {
    email,
    fullName,
    phone,
    password,
    confirmPassword,
    location,
  } = req.body;
  const validateData = {email, fullName, phone, password, location};

  const {error} = new RegisterValidator(
    validateData,
  ).checkValidation();
  if (error)
    return res
      .status(200)
      .json({success: false, payload: error.message});
  console.log(password, confirmPassword);
  if (password !== confirmPassword)
    return next(
      createCustomError('The passwords entered do not match. ', 400),
    );
  const findEmail = await UserModel.findOne({
    where: {
      email,
    },
  });
  const full_name = fullName;
  if (findEmail)
    return next(
      createCustomError(
        'Sorry You cannot use this email address.please try another one',
        400,
      ),
    );

  const isPhoneFound = await UserModel.findOne({
    where: {phone: phone},
  });
  if (isPhoneFound)
    return next(
      createCustomError(
        'Sorry, Phone number already exist in our system, please try another one',
        400,
      ),
    );

  const hashPassword = await new HashPassword(password).hash();
  if (!hashPassword) {
    logger.error(`Failed to hash password`, {
      errorSource: 'Bcrypt',
      userId: null,
      errorType: 'hash Error',
      action: 'hash password',
      statusCode: 500,
      ip: req.clientIp,
    });
    return next(
      createCustomError(
        'Sorry!, Something went wrong,please try again later',
        500,
      ),
    );
  }

  req.session.customer_details = {};
  req.session.customer_details.password = hashPassword;
  req.session.customer_details.email = email;
  req.session.customer_details.phone = phone;
  req.session.customer_details.full_name = full_name;
  req.session.customer_details.location = location;
  sendMailOTP(email, req)
    .then(response => {
      return res.status(200).json({
        success: true,
        payload: {
          message: `OTP has been sent to ${email}`,
          authUrl: '/customer/validate-otp',
        },
      });
    })
    .catch(error => {
      logger.error(`${error.message}`, {
        errorSource: 'Twilio',
        userId: null,
        errorType: 'connection error',
        action: 'send mail',
        statusCode: 500,
        ip: req.clientIp,
      });
      return next(
        createCustomError(
          'System is unable to sent Otp to your Mail. please try again later',
          500,
        ),
      );
    });
});

module.exports = {
  registerController,
};
