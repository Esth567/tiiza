
const { otpValidation, requestOtp } = require('./OTPController');

const { registerController } = require('./registerController');
const {
  lostItemCtrl,
  fetchLostItemsCtrl,
  fetchCustomerLostItems,
  foundLostItemCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerFoundItems,
} = require('./lostAndFoundController');
const { getCustomersProfile, updateCustomersProfile } = require('./profileController');

const { resetPassword, confirmResetPassword } = require('./resetPasswordController');

module.exports = {
  updateCustomersProfile,
  getCustomersProfile,
  resetPassword,
  confirmResetPassword,
  foundLostItemCtrl,
  fetchFoundItemsCtrl,
  otpValidation,
  registerController,
  requestOtp,
  fetchCustomerFoundItems,
  fetchLostItemsCtrl,
  lostItemCtrl,
  fetchCustomerLostItems,

};
