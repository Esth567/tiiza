const router = require('express').Router();
const login = require('./routes/login');
const profile = require('./routes/profile');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');
const otpAction = require('./routes/otpAction');
const cardPayment = require('./routes/cardPayment');
const conversation = require('./routes/conversation');
const resetPasswordCtrl = require('./routes/resetPassword');
const lostAndFound = require('./routes/lostAndFound');

router.use(resetPasswordCtrl);
router.use(conversation);
router.use(lostAndFound);
router.use(cardPayment);
router.use(otpAction);
router.use(dashboard);
console.log(register);
router.use(register);
router.use(profile);
router.use(login);

module.exports = router;
