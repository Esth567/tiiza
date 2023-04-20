
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const { HashPassword } = require('../../authentication/password');
const { RegisterValidation } = require('../../validation/validation');
const { createCustomError } = require('../../middleware/customError');
const { sendMailOTP } = require('../../utils/sendMailOtp');

require('dotenv').config();

const registerController = asyncWrapper(async (req, res, next) => {

  const { email, fullName, phone, password, confirmPassword } =
    req.body;
  const validateData = { email, fullName, phone, password };
  // payload validation
  const { error } = new RegisterValidation(validateData).checkValidation();
  if (error) return res.status(200).json({ success: false, payload: error.message });
  console.log(password, confirmPassword);
  if (password !== confirmPassword)
    return next(createCustomError('The passwords entered do not match. ', 400));
  const findEmail = await UserModel.findOne({
    where: {
      email
    }
  });
  const full_name = fullName;
  if (findEmail)
    return next(
      createCustomError('Sorry You cannot use this email address.please try another one', 400)
    );
  // user lookup
  const isPhoneFound = await UserModel.findOne({ where: { phone: phone } });
  if (isPhoneFound)
    return next(
      createCustomError(
        'Sorry, Phone number already exist in our system, please try another one',
        400
      )
    );


  // password hash
  const hashPassword = await new HashPassword(password).hash();
  if (!hashPassword)
    return next(createCustomError('Sorry!, Something went wrong,please try again later', 400));

  req.session.customer_details = {};
  req.session.customer_details.password = hashPassword;
  req.session.customer_details.email = email;
  req.session.customer_details.phone = phone;
  req.session.customer_details.full_name = full_name;
  const reponse = await sendMailOTP(email, req);
  console.log(response)
  return res.status(200).json({
    success: true,
    payload: { message: `OTP has been sent to ${email}`, authUrl: '/customer/validate-otp' },
  });

  // response
});

module.exports = {
  registerController,
};
