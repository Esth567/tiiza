const router = require('express').Router();
const {
  getCustomersProfileCtrl,
  updateCustomersProfileCtrl,
  updateNumberCtrl,
} = require('../controllers');
const VerifyUser = require('../../middleware/auth');

router.get('/profile', VerifyUser.ensureAuthenticated, getCustomersProfileCtrl);
router.patch('/update/phone', updateNumberCtrl);
router.patch('/update/profile', VerifyUser.ensureAuthenticated, updateCustomersProfileCtrl);

module.exports = router;
