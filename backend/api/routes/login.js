const router = require('express').Router();
const passport = require('passport');
const initializePassport = require('../../services/passportConfig');
const UserModel = require('../../models/userModel');
const { sendSMSOtp } = require('../../utils/sendSMSOtp');
const { createCustomError } = require('../../middleware/customError');
const SubscriptionModel = require('../../models/subscriptionModel');
require("dotenv").config()
// const { verifyBvn } = require('../../utils/bvnVerification');
initializePassport(
  passport,
  (email) => UserModel.findOne({ where: { email: email } }),
  (id) => UserModel.findOne({ where: { user_id: id } })
);
router.post(
  '/login',

  (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) return res.status(400).json({ success: false, payload: info });
      if (!user) return res.status(401).json({ success: false, payload: info });
      if (user) {
        // console.log(user);
        req.login(user, function (err) {
          console.log('err');
          if (err) {
            return next(err);
          }

          // SubscriptionModel.create({
          //   name: 'Example Subscription',
          //   customer_id: user.user_id,
          //   duration: 1 * 60, // in days
          //   startDate: new Date(),
          //   endDate: new Date(Date.now() + 0 * 60 * 1000), // 30 days from now
          // }).then(response => {

          //   // console.log(response)
          // })
          // return
          console.log(user.is_verified)
          if (!user.is_verified) {
            console.log("lll")
            console.log(user.phone)

            sendSMSOtp(process.env.TWILIO_FROM_NUMBER, user.phone, req).then(response => {
              // req.session.customer_details = {}
              req.session.customer_details = user;
              return res.status(200).json({
                success: true,
                payload: { message: `OTP has been sent to ${user.phone}`, authUrl: '/customer/validate-otp' },
              });
            }).catch(error => {
              console.log(error)
              return next(
                createCustomError('System is unable to connect to your phone.please try again later', 500)
              );
            })
          }
          return res.status(200).send({ success: true, payload: "Login successful" })

          // return res.redirect('/api/v1/customer/dashboard');
        });
      }

    })(req, res, next);
  }
);

router.post('/logout', (req, res, next) => {
  req.logOut(function (error) {
    if (error) return next(error);
    return res.redirect('/');
  });
  return res.status(200).json({ success: true, payload: 'you are successfully  logged out' });
});

module.exports = router;
