require('dotenv').config();
// ***************|| MODULES ||***********************
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const { HashPassword } = require('../../authentication/password');
const { RegisterValidator } = require('../../validation/validation');
const { createCustomError } = require('../../middleware/customError');
const { sendMailOTP } = require('../../utils/sendMailOtp');
const { logger } = require('../../utils/winstonLogger');
const { generateUniqueId } = require('../../utils/uniqueIds');

//========================================================== || REGISTER CTRL  || ===================================================================

const registerController = asyncWrapper(async (req, res, next) => {
  const requestId = res.getHeader('X-request-Id');

  const { email, fullName, phone, password, confirmPassword, location } = req.body;
  const validateData = { email, fullName, phone, password, location };

  const { error } = new RegisterValidator(validateData).checkValidation();
  if (error) return res.status(200).json({ success: false, payload: error.message });
  if (password !== confirmPassword)
    return next(createCustomError('The passwords entered do not match. ', 400));
  const findEmail = await UserModel.findOne({
    where: {
      email,
    },
  });
  const full_name = fullName;
  if (findEmail)
    return next(
      createCustomError('Sorry You cannot use this email address.please try another one', 400)
    );

  const isPhoneFound = await UserModel.findOne({
    where: { phone: phone },
  });
  if (isPhoneFound)
    return next(
      createCustomError(
        'Sorry, Phone number already exist in our system, please try another one',
        400
      )
    );

  const hashPassword = await new HashPassword(password).hash();
  if (!hashPassword) {
    logger.error(`Failed to hash password`, {
      module: 'registerController.js',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      method: req.method,
      path: req.path,
      action: 'Hash password',
      statusCode: 500,
      clientIp: req.clientIp,
    });
    return next(createCustomError('Sorry!, Something went wrong,please try again later', 500));
  }

  req.session.user_details = {
    password: hashPassword,
    email,
    phone,
    full_name,
    location,
    user_role: null,
  };
  const options = {
    companyName: process.env.COMPANY_NAME,
    homeUrl: process.env.DOMAIN_NAME,
    currentYear: new Date().getFullYear(),
    itemName: 'Email Confirmation',
    emailTitle: 'Account Security Notification: OTP Authentication',
    email,
    req,
  };

  sendMailOTP(options)
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
      console.log(error);

      logger.error(`${error.message}`, {
        module: 'registerController.js',
        userId: req.user ? req.user.user_id : null,
        requestId: requestId,
        action: 'Send mail OTP',
        method: req.method,
        path: req.path,
        statusCode: 500,
        clientIp: req.clientIp,
      });
      return next(
        createCustomError('System is unable to sent Otp to your Mail. please try again later', 500)
      );
    });
});

module.exports = {
  registerController,
};
