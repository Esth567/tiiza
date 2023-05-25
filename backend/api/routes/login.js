const router = require('express').Router();
const passport = require('passport');
const initializePassport = require('../../services/passportConfig');
const UserModel = require('../../models/userModel');
const {sendSMSOtp} = require('../../utils/sendSMSOtp');
const {createCustomError} = require('../../middleware/customError');
const {logger} = require('../../utils/winstonLogger');
require('dotenv').config();
initializePassport(
  passport,
  email => UserModel.findOne({where: {email: email}}),
  id => UserModel.findOne({where: {user_id: id}}),
);

router.post(
  '/login',

  (req, res, next) => {
    const requestId = res.getHeader('X-request-Id');

    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return res
          .status(400)
          .json({success: false, payload: info.payload});
      }

      if (!user) {
        const message = info.payload.logMsg
          ? info.payload.logMsg
          : 'Validation Error ';
        logger.warn(`${message}`, {
          module: 'login.js',
          requestId: requestId,
          userId: req.user ? req.user.user_id : null,
          method: req.method,
          path: req.path,
          action: 'authentication',
          statusCode: !info.payload.statusCode
            ? 400
            : info.payload.statusCode,
          clientIp: req.clientIp,
        });

        return res
          .status(401)
          .json({success: false, payload: info.payload.message});
      }
      if (user) {
        req.login(user, function (err) {
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
                req.session.user_details = user;
                return res.status(200).json({
                  success: true,
                  payload: {
                    message: `OTP has been sent to ${user.phone}`,
                    authUrl: '/validate-otp',
                  },
                });
              })
              .catch(error => {
                logger.error(`${error}`, {
                  requestId: requestId,
                  userId: null,
                  method: req.method,
                  path: req.path,
                  action: 'Send SMS',
                  statusCode: 500,
                  clientIp: req.clientIp,
                });
                return next(
                  createCustomError(
                    'System is unable to connect to your phone.please try again later',
                    500,
                  ),
                );
              });
          } else {
            logger.info('Authentication successful', {
              module: 'login.js',
              requestId: requestId,
              userId: user.user_id,
              method: req.method,
              path: req.path,
              action: 'authentication',
              statusCode: 200,
              clientIp: req.clientIp,
            });
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
    return res.sendStatus(200);
  });
  return res.status(200).json({
    success: true,
    payload: 'you are successfully  logged out',
  });
});

module.exports = router;
