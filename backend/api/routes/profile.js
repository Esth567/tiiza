const router = require('express').Router();
const {
  getCustomersProfileCtrl,
  updateCustomersProfileCtrl,
  updateNumberCtrl,
} = require('../controllers');
const VerifyUser = require('../../middleware/auth');

router.get(
  '/customer/profile',
  VerifyUser.ensureAuthenticated,
  getCustomersProfileCtrl,
);
router.patch('/customer/update/phone', updateNumberCtrl);
router.patch(
  '/customer/update/profile',
  VerifyUser.ensureAuthenticated,
  updateCustomersProfileCtrl,
);

module.exports = router;
