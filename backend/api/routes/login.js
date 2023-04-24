const router = require('express').Router();
const passport = require('passport');
const initializePassport = require('../../services/passportConfig');
const UserModel = require('../../models/userModel');
const {sendSMSOtp} = require('../../utils/sendSMSOtp');
const {createCustomError} = require('../../middleware/customError');
const {logger} = require('../../utils/winstonLogger');
const {errorLogger} = require('../../utils/fileLogger');
require('dotenv').config();
initializePassport(
  passport,
  email => UserModel.findOne({where: {email: email}}),
  id => UserModel.findOne({where: {user_id: id}}),
);
router.post(
  '/login',

  (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return res
          .status(400)
          .json({success: false, payload: info.payload});
      }

      if (!user) {
        console.log(info);
        logger.warn(`${info.payload.logMsg}`, {
          errorSource: 'Login',
          userId: null,
          errorType: 'authentication error',
          action: 'login',
          statusCode: info.payload.statusCode,
          ip: req.clientIp,
        });

        return res
          .status(401)
          .json({success: false, payload: info.payload.message});
      }
      if (user) {
        req.login(user, function (err) {
          console.log('err');
          if (err) {
            return next(err);
          }
          if (!user.is_verified) {
            sendSMSOtp(
              process.env.TWILIO_FROM_NUMBER,
              user.phone,
              req,
            )
              .then(response => {
                req.session.customer_details = user;
                return res.status(200).json({
                  success: true,
                  payload: {
                    message: `OTP has been sent to ${user.phone}`,
                    authUrl: '/customer/validate-otp',
                  },
                });
              })
              .catch(error => {
                console.log(error);
                return next(
                  createCustomError(
                    'System is unable to connect to your phone.please try again later',
                    500,
                  ),
                );
              });
          } else {
            return res
              .status(200)
              .send({success: true, payload: 'Login successful'});
          }
        });
      }
    })(req, res, next);
  },
);

router.post('/logout', (req, res, next) => {
  req.logOut(function (error) {
    if (error) return next(error);
    return res.redirect('/customer/dashboard');
  });
  return res.status(200).json({
    success: true,
    payload: 'you are successfully  logged out',
  });
});

module.exports = router;
