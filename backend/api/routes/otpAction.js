const router = require('express').Router();
const { requestOtp, otpValidation, smsOtpValidationCtrl } = require('../controllers');
console.log(requestOtp)
router.post('/customer/validate-otp', otpValidation);
router.post('/customer/resend-otp', requestOtp);
router.post('/customer/validate-sms-otp', smsOtpValidationCtrl);

module.exports = router;
