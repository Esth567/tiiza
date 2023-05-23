const router = require('express').Router();
const login = require('./routes/login');
const profile = require('./routes/profile');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');
const otpAction = require('./routes/otpAction');
const cardPayment = require('./routes/cardPayment');
const conversation = require('./routes/conversation');
const resetPassword = require('./routes/resetPassword');
const lostAndFound = require('./routes/lostAndFound');
const qrCodeOrder = require('./routes/qrcodeBooking');
const adminRoutes = require('./routes/admin');
router.use(resetPassword);
router.use(conversation);
router.use(lostAndFound);
router.use(qrCodeOrder);

router.use(cardPayment);
router.use(adminRoutes);
router.use(otpAction);
router.use(dashboard);
router.use(register);
router.use(profile);
router.use(login);

module.exports = router;
