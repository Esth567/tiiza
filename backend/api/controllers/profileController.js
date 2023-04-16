const { Op } = require('sequelize');
const UserModel = require('../../models/userModel');
const asyncWrapper = require('../../middleware/asyncWrapper');
const { ProfileValidator } = require('../../validation/validation');
const { createCustomError } = require('../../middleware/customError');
const getCustomersProfile = asyncWrapper(async (req, res) => {
  const { user_id } = req.user;

  const userProfile = await UserModel.findOne({
    where: { user_id },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });
  if (!userProfile)
    return res.status(500).send({ success: false, payload: 'Sorry something went wrong' });

  return res.status(200).send({ success: true, payload: userProfile });
});

// ---------------------------UPDATE CUSTOMERS PROFILE-----------------------------------------------------------------

const updateCustomersProfile = asyncWrapper(async (req, res, next) => {
  const { user_id, phone } = req.user;
  console.log({ user_id, phone });
  const { full_name, new_phone } = req.body;
  const { error } = new ProfileValidator({
    full_name,
    phone: new_phone,
  }).validate();
  if (error) return next(createCustomError(error.message, 400));
  const isPhoneReg = await UserModel.findOne({ where: { phone: new_phone } });
  if (isPhoneReg && isPhoneReg.dataValues.phone !== phone)
    return next(
      createCustomError('phone number is already registered.Please try another phone number', 400)
    );

  const userProfile = await UserModel.update(
    { phone: new_phone, full_name },
    { where: { user_id } }
  );
  if (!userProfile[0])
    return next(createCustomError('Sorry, something went wrong.Please try again later', 500));

  return res.status(200).send({ success: true, payload: 'Profile update, successful!' });
});

module.exports = { getCustomersProfile, updateCustomersProfile };
