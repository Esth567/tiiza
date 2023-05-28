const {
  emailOtpValidationCtrl,
  smsOtpValidationCtrl,
  requestSMSOtpCtrl,
  requestOtpCtrl,
} = require('./OTPController');
const { CardPaymentCtrl } = require('./cardPaymentController');
const { registerController } = require('./registerController');
const {
  InitiateConversationCtrl,
  getConversationCtrl,
  sendMessageCtrl,
  fetchMessageCtrl,
} = require('./conversationController');
const {
  fetchCustomerFoundItemsCtrl,
  fetchCustomerLostItemsCtrl,
  fetchFoundItemsCtrl,
  fetchLostItemsCtrl,
  foundLostItemCtrl,
  lostItemCtrl,
} = require('./lostAndFoundController');
const {
  getCustomersProfileCtrl,
  updateCustomersProfileCtrl,
  updateNumberCtrl,
} = require('./profileController');

const { resetPasswordCtrl, confirmResetPasswordCtrl } = require('./resetPasswordController');
const { subscriptionCtrl } = require('./subscriptionController');
const {
  adminFetchSubscriptionCtrl,
  adminFetchFoundItemsCtrl,
  adminFetchUsersCtrl,
  adminFetchLostItemsCtrl,
  adminCreateUserCtrl,
  adminUpdateItemCtrl,
  updatePasswordCtrl,
  adminFetchActivities,
  adminFetchPayments,
} = require('./adminController');
const { qrCodeOrderCtrl, fetchQRCodeOrdersCtrl } = require('./bookingController');
module.exports = {
  updateCustomersProfileCtrl,
  fetchCustomerLostItemsCtrl,
  fetchCustomerFoundItemsCtrl,
  adminFetchSubscriptionCtrl,
  confirmResetPasswordCtrl,
  InitiateConversationCtrl,
  adminFetchFoundItemsCtrl,
  adminFetchUsersCtrl,
  adminFetchLostItemsCtrl,
  adminUpdateItemCtrl,
  getCustomersProfileCtrl,
  emailOtpValidationCtrl,
  adminCreateUserCtrl,
  qrCodeOrderCtrl,
  CardPaymentCtrl,
  fetchQRCodeOrdersCtrl,
  adminFetchActivities,
  adminFetchPayments,
  smsOtpValidationCtrl,
  fetchFoundItemsCtrl,
  getConversationCtrl,
  registerController,
  updatePasswordCtrl,
  fetchLostItemsCtrl,
  resetPasswordCtrl,
  foundLostItemCtrl,
  requestSMSOtpCtrl,
  fetchMessageCtrl,
  updateNumberCtrl,
  subscriptionCtrl,
  sendMessageCtrl,
  requestOtpCtrl,
  lostItemCtrl,
};
