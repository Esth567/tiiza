const router = require('express').Router();
const path = require('path');
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

router.get('/customer/reset', (req, res) => {
  return res.sendFile(
    path.join(__dirname, '../../public', 'resetPassword.html'),
  );
});
module.exports = router;
