const LocalStrategy = require('passport-local').Strategy;
const {LoginValidator} = require('../validation/validation');
const bcrypt = require('bcrypt');
const {UnHashPassword} = require('../authentication/password');
const passport = require('passport');
const {logger} = require('../utils/winstonLogger');

const initializePassport = (
  passport,
  getUserByEmail,
  getUserById,
) => {
  async function authenticateUser(email, password, done) {
    const validateData = {email, password};
    // console.log(req);

    const {error} = new LoginValidator(validateData).validate();

    if (error)
      return done(null, false, {payload: {message: error.message}});

    const user = await getUserByEmail(email);

    if (user == null)
      return done(null, false, {
        payload: {
          message: 'Invalid Credentials',
          statusCode: 404,
          logMsg: `Failed login attempt for email: ${email}. Reason: Incorrect password entered.`,
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
            logMsg: `Failed login attempt for email: ${email}. Reason: Incorrect password entered.`,
          },
        });
      }
    } catch (e) {
      logger.warn(`${e.message}`, {
        errorSource: 'Login DB',
        userId: null,
        errorType: 'passport.js error',
        action: 'authentication',
        statusCode: 500,
        ip: req.clientIp,
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
