const router = require('express').Router();
const VerifyUser = require('../../middleware/auth');
const {
  resetPasswordCtrl,
  confirmResetPasswordCtrl,
} = require('../controllers');

router.post('/customer/reset-password', resetPasswordCtrl);
router.post(
  '/customer/confirm-password/:token',
  confirmResetPasswordCtrl,
);

module.exports = router;
