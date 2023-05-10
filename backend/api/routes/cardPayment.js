const router = require('express').Router();
const {
  cardPaymentCtrl,
  cardAuthorizationCtrl,
  validateCardTransactionCtrl,
} = require('../controllers');
const VerifyUser = require('../../middleware/auth');
const {
  initiateMediaTransfer,
} = require('../../services/multerConfig');

router.post(
  '/flw/payment/card-payment',
  VerifyUser.ensureAuthenticated,
  cardPaymentCtrl,
);
router.post(
  '/flw/payment/card-payment/authorization',
  VerifyUser.ensureAuthenticated,
  cardAuthorizationCtrl,
);
router.post(
  '/flw/payment/card-payment/validation',
  VerifyUser.ensureAuthenticated,
  validateCardTransactionCtrl,
);

module.exports = router;
