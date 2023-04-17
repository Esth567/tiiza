const router = require('express').Router();
const { requestOtp, otpValidation } = require('../controllers');
console.log(requestOtp)
router.post('/customer/validate-otp', otpValidation);
router.post('/customer/resend-otp', requestOtp);

module.exports = router;
