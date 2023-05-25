const router = require('express').Router();
const {CardPaymentCtrl} = require('../controllers');
const VerifyUser = require('../../middleware/auth');

router.post(
  '/flw/payment/card-payment',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,
  CardPaymentCtrl.initiatePayment,
);
router.post(
  '/flw/payment/card-payment/authorization',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  CardPaymentCtrl.cardAuthorization,
);
router.post(
  '/flw/payment/card-payment/validation',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  CardPaymentCtrl.validateCardTransaction,
);

module.exports = router;
