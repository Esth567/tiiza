
const { otpValidation, requestOtp, smsOtpValidationCtrl } = require('./OTPController');
const { cardPaymentCtrl, cardAuthorizationCtrl, validateCardTransactionCtrl } = require("./cardPaymentController")
const { registerController } = require('./registerController');
const { InitiateConversationCtrl, getConversationCtrl, sendMessageCtrl, fetchMessageCtrl } = require('./conversationController');
const {
  lostItemCtrl,
  fetchLostItemsCtrl,
  fetchCustomerLostItems,
  foundLostItemCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerFoundItems,
} = require('./lostAndFoundController');
const { getCustomersProfile, updateCustomersProfile, updateNumberCtrl } = require('./profileController');

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
  InitiateConversationCtrl,
  getConversationCtrl,
  sendMessageCtrl,
  fetchMessageCtrl,
  smsOtpValidationCtrl,
  updateNumberCtrl,
  cardPaymentCtrl,
  cardAuthorizationCtrl,
  validateCardTransactionCtrl
};
