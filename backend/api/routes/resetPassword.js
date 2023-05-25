const router = require('express').Router();
const path = require('path');
const { resetPasswordCtrl, confirmResetPasswordCtrl } = require('../controllers');

router.post('/customer/reset-password', resetPasswordCtrl);
router.patch('/customer/confirm-password/:token', confirmResetPasswordCtrl);

router.get('/customer/reset-password/:token', (req, res) => {
  return res.sendFile(path.join(__dirname, '../../public', 'resetPassword.html'));
});
module.exports = router;
