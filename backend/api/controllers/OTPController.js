const speakeasy = require('speakeasy');
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const { sendMailOTP } = require('../../utils/sendMailOtp');
const { createCustomError } = require('../../middleware/customError');
require('dotenv').config();
const otpValidation = asyncWrapper(async (req, res, next) => {
    const { token } = req.body;
    if (!token) return next(createCustomError('Input cannot be empty', 400));
    console.log(req.session);
    if (!req.session.user_otp_auth || !req.session.customer_details)
        return next(createCustomError('Sorry You are not authorized to access this resource', 401));
    const secret = req.session?.user_otp_auth;

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        time: 120,
    });

    // if (!verified) return next(createCustomError('Invalid OTP', 400));
    const { password, phone, email, full_name, } =
        req.session.customer_details;
    const createdUser = await UserModel.create({
        full_name,
        email,
        phone,
        password,
    });

    if (!Object.values(createdUser.dataValues).length > 0)
        next(createCustomError('Sorry, Something went wrong,please try again', 500));

    req.session.customer_details = {};
    req.session.user_otp_auth = '';
    return res.status(201).json({ success: true, payload: createdUser });
});






const requestOtp = asyncWrapper(async (req, res, next) => {
    const { email } = req.body;
    sendMailOTP(email, req);
    return res.status(200).json({
        success: true,
        payload: { message: `OTP has been sent to ${email}`, authUrl: '/customer/validate-otp' },
    });
});

module.exports = { otpValidation, requestOtp };
