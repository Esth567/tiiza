const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
// *****************|| MODULES ||********************************
const {LoginValidator} = require('../validation/validation');
const {UnHashPassword} = require('../authentication/password');
const {logger} = require('../utils/winstonLogger');
const {generateUniqueId} = require('../utils/uniqueIds');
const requestId = generateUniqueId();

const initializePassport = (
  passport,
  getUserByEmail,
  getUserById,
) => {
  async function authenticateUser(email, password, done) {
    const validateData = {email, password};

    const {error} = new LoginValidator(validateData).validate();

    if (error)
      return done(null, false, {
        payload: {
          message: error.message,
          logMsg: 'Failed Login Attempt',
        },
      });

    const user = await getUserByEmail(email);

    if (user == null)
      return done(null, false, {
        payload: {
          message: 'Invalid Credentials',
          statusCode: 404,
          logMsg: `Failed Authentication attempt for email: ${email}. Reason: Invalid Credentials.`,
        },
      });

    const fetchUser = user?.dataValues;

    try {
      if (
        await new UnHashPassword(
          password,
          fetchUser.password,
        ).compare()
      ) {
        return done(null, fetchUser);
      } else {
        return done(null, false, {
          payload: {
            message: 'Incorrect email or Password',
            statusCode: 401,
            logMsg: `Failed Authentication attempt for email: ${email}. Reason: Incorrect password entered.`,
          },
        });
      }
    } catch (e) {
      logger.warn(`${e.message}`, {
        module: 'passportConfig.js',
        requestId: requestId,
        userId: null,
        method: req.method,
        path: req.path,
        action: 'Authentication',
        statusCode: 500,
        clientIp: req.clientIp,
      });
      return done(e);
    }
  }

  passport.use(
    new LocalStrategy({usernameField: 'email'}, authenticateUser),
  );
  passport.serializeUser((user, done) => done(null, user.user_id));
  passport.deserializeUser(async (id, done) => {
    console.log(id);
    return done(null, await getUserById(id));
  });
};

module.exports = initializePassport;
