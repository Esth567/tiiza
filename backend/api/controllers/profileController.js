const {Op} = require('sequelize');
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const {
  ProfileValidator,
  PhoneValidator,
} = require('../../validation/validation');
const {createCustomError} = require('../../middleware/customError');
const {sendSMSOtp} = require('../../utils/sendSMSOtp');
require('dotenv').config();
// ===============================CUSTOMER GET PROFILE ===============================

const getCustomersProfileCtrl = asyncWrapper(async (req, res) => {
  const {user_id} = req.user;

  const userProfile = await UserModel.findOne({
    where: {user_id},
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
  });
  if (!userProfile)
    return res
      .status(500)
      .send({success: false, payload: ' An unexpected error occurred while getting the customer profile'});

  return res.status(200).send({success: true, payload: userProfile});
});

// ===============================UPDATE CUSTOMERS PROFILE===============================

const updateCustomersProfileCtrl = asyncWrapper(
  async (req, res, next) => {
    const {user_id, phone} = req.user;
    console.log({user_id, phone});
    const {full_name, new_phone} = req.body;
    const {error} = new ProfileValidator({
      full_name,
      phone: new_phone,
    }).validate();
    if (error) return next(createCustomError(error.message, 400));
    const isPhoneReg = await UserModel.findOne({
      where: {phone: new_phone},
    });
    if (isPhoneReg && isPhoneReg.dataValues.phone !== phone)
      return next(
        createCustomError(
          'phone number is already registered.Please try another phone number',
          400,
        ),
      );

    const userProfile = await UserModel.update(
      {phone: new_phone, full_name},
      {where: {user_id}},
    );
    if (!userProfile[0])
      return next(
        createCustomError(
          'Sorry, something went wrong.Please try again later',
          500,
        ),
      );

    return res
      .status(200)
      .send({success: true, payload: 'Profile update, successful!'});
  },
);

// ===============================CUSTOMER UPDATE NUMBER ===============================

const updateNumberCtrl = asyncWrapper(async (req, res, next) => {
  if (!req.session.customer_details)
    return next(
      createCustomError(
        "Sorry,you don't have access to this resource ",
        403,
      ),
    );
  const {email} = req.session.customer_details;
  const {phone} = req.body;
  const getUser = await UserModel.findOne({where: {email}});
  if (!getUser)
    return next(
      createCustomError(
        'Sorry, Systeme is unable to find account. please try again',
        404,
      ),
    );
  const {error} = new PhoneValidator({phone}).validate();
  if (error) return next(createCustomError(error.message, 400));

  const updatePhone = await UserModel.update(
    {phone},
    {where: {email}},
  );
  if (!updatePhone[0])
    return next(
      createCustomError(
        'Sorry, something went wrong.Please try again later',
        500,
      ),
    );

  sendSMSOtp(process.env.TWILIO_FROM_NUMBER, phone, req)
    .then(response => {
      res.status(200).json({
        success: true,
        payload: {
          message: `OTP has been sent to ${phone}`,
          authUrl: '/customer/validate-otp',
        },
      });
    })
    .catch(error => {
      next(
        createCustomError(
          'System is unable to connect to your phone.please try again later',
          500,
        ),
      );
    });
});

module.exports = {
  getCustomersProfileCtrl,
  updateCustomersProfileCtrl,
  updateNumberCtrl,
};
