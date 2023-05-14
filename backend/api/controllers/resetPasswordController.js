const jwt = require('jsonwebtoken');
const UserModel = require('../../models/userModel');
const {sendResetEmail} = require('../../utils/sendResetMail');
const asyncWrapper = require('../../middleware/asyncWrapper');
const {HashPassword} = require('../../authentication/password');
const {createCustomError} = require('../../middleware/customError');
const ResetPasswordModel = require('../../models/resetPasswordModel');
const {
  EmailValidator,
  PasswordValidator,
} = require('../../validation/validation');
require('dotenv').config();

// ===============================|| CUSTOMER RESET PASSWORD ||===============================

const resetPasswordCtrl = asyncWrapper(async (req, res, next) => {
  const email = req.body.email;
  const {error} = new EmailValidator({email: email}).validate();
  if (error) return next(createCustomError(error.message, 400));
  // generate a unique token for this reset request
  const resetToken = jwt.sign(
    {email},
    process.env.RESET_TOKEN_SECRET,
    {expiresIn: '1h'},
  );

  // stores the reset token in database
  const isTrue = await storeResetToken(email, resetToken);

  // sends an email to the user
  const resetUrl = `${process.env.DOMAIN_NAME}api/v1/customer/reset-password/${resetToken}`;
  // send email to the customer
  await sendResetEmail(email, resetUrl);

  res
    .status(200)
    .json({success: true, payload: 'Password reset email sent'});
});
// ===============================||  CONFIRM RESET PASSWORD ||===============================

const confirmResetPasswordCtrl = asyncWrapper(
  async (req, res, next) => {
    // get info from user from FE
    const {token} = req.params;
    const {newPassword, confirmPassword} = req.body;
    const {error} = new PasswordValidator({
      password: newPassword,
    }).validate();
    if (error) return next(createCustomError(error.message, 400));

    if (newPassword !== confirmPassword)
      return next(createCustomError('password Do not match', 400));
    // verifies the reset token and retrieves the user's email address
    let customerEmail = null;
    try {
      const {email} = jwt.verify(
        token,
        process.env.RESET_TOKEN_SECRET,
      );
      customerEmail = email;
    } catch (error) {
      console.log(error);
      return next(
        createCustomError(
          'Sorry, Your reset link has expired.Please request for a new link',
          400,
        ),
      );
    }

    // updates the user's password in  database
    await updatePassword(customerEmail, newPassword, next);
    // deletes the reset token from  database
    await deleteResetToken(customerEmail, token);

    return res.status(200).json({
      success: true,
      payload:
        'Your password has been successfully reset. You may now log in using your new password.',
    });
  },
);

async function storeResetToken(email, token) {
  // stores the reset token in  database
  const createRecord = await ResetPasswordModel.create({
    email: email,
    token: token,
  });
  return createRecord;
}

async function updatePassword(email, password, next) {
  const hashPassword = await new HashPassword(password).hash();

  if (!hashPassword)
    return next(
      createCustomError(
        'Sorry!, Something went wrong,please try again later',
        400,
      ),
    );
  // updates the user's password in database
  const updateUser = await UserModel.update(
    {password: hashPassword},
    {where: {email: email}},
  );
  return updateUser;
}

async function deleteResetToken(email, token) {
  const isDeleted = await ResetPasswordModel.destroy({
    where: {email: email},
  });

  return isDeleted;
}
module.exports = {resetPasswordCtrl, confirmResetPasswordCtrl};
