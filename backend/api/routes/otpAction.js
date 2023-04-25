const router = require('express').Router();
const { requestOtpCtrl, emailOtpValidationCtrl, smsOtpValidationCtrl } = require('../controllers');
console.log(requestOtpCtrl)
router.post('/customer/validate-otp', emailOtpValidationCtrl);
router.post('/customer/resend-otp', requestOtpCtrl);
router.post('/customer/validate-sms-otp', smsOtpValidationCtrl);

module.exports = router;
