const speakeasy = require('speakeasy');
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const {sendMailOTP} = require('../../utils/sendMailOtp');
const {createCustomError} = require('../../middleware/customError');
const {logger} = require('../../utils/winstonLogger');
require('dotenv').config();
const emailOtpValidationCtrl = asyncWrapper(
  async (req, res, next) => {
    const {token} = req.body;
    if (!token)
      return next(createCustomError('Input cannot be empty', 400));
    if (!req.session.user_otp_auth || !req.session.customer_details)
      return next(
        createCustomError(
          'Sorry You are not authorized to access this resource',
          401,
        ),
      );
    const secret = req.session?.user_otp_auth;
    // verify otp
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      time: 600,
    });

    if (!verified) return next(createCustomError('Invalid OTP', 400));
    const {password, phone, email, full_name, location} =
      req.session.customer_details;
    const createdUser = await UserModel.create({
      full_name,
      email,
      phone,
      password,
      location,
    });

    if (!Object.values(createdUser.dataValues).length > 0)
      next(
        createCustomError(
          'Sorry, Something went wrong,please try again',
          500,
        ),
      );

    req.session.customer_details = {};
    req.session.user_otp_auth = '';
    return res
      .status(201)
      .json({success: true, payload: createdUser});
  },
);

const smsOtpValidationCtrl = asyncWrapper(async (req, res, next) => {
  const {token} = req.body;
  if (!token)
    return next(createCustomError('Input cannot be empty', 400));
  const secret = req.session?.user_otp_auth;
  if (!req.session.user_otp_auth || !req.session.customer_details)
    return next(
      createCustomError(
        'Sorry You are not authorized to access this resource',
        401,
      ),
    );
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    time: 600, //last for 10 minss
  });

  const {email} = req.session.customer_details;
  const user = req.session.customer_details;
  if (!verified) return next(createCustomError('Invalid OTP', 400));

  const updateUser = await UserModel.update(
    {is_verified: true},
    {where: {email}},
  );
  if (!updateUser[0]) {
    logger.error(`Unable to Update phone number |`, {
      errorSource: 'Users Table',
      userId: null,
      errorType: 'DB error',
      action: 'update phone number',
      statusCode: 500,
      ip: req.clientIp,
    });
    return next(
      createCustomError(
        'Sorry, something went wrong.Please try again later',
        500,
      ),
    );
  }
  req.login(user, function (err) {
    console.log('err');
    if (err) {
      return next(err);
    }
    req.session.customer_details = {};
    req.session.user_otp_auth = '';
    return res
      .status(200)
      .send({success: true, payload: 'Login successful'});
  });
});

const requestOtpCtrl = asyncWrapper((req, res, next) => {
  const {email} = req.body;
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
  emailOtpValidationCtrl,
  requestOtpCtrl,
  smsOtpValidationCtrl,
};
