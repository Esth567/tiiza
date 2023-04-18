const router = require('express').Router();
const login = require('./routes/login');
const profile = require('./routes/profile');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');
const resetPassword = require('./routes/resetPassword');
const otpAction = require('./routes/otpAction');
const conversation = require('./routes/conversation');

const lostAndFound = require('./routes/lostAndFound');


// const failedTransaction = require('./routes/flwRoutes/failedTransaction');


router.use(lostAndFound);
router.use(resetPassword);

router.use(otpAction);
console.log(register);
router.use(dashboard);
router.use(register);
router.use(profile);
router.use(login);
router.use(conversation);

module.exports = router;
