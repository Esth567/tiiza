const {logger} = require('../utils/winstonLogger');

class VerifyUser {
  static ensureAuthenticated(req, res, next) {
    const requestId = res.getHeader('X-request-Id');

    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    logger.warn(`Authorization Error`, {
      module: 'auth.js',
      requestId: requestId,
      userId: req.user ? req.user.user_id : null,
      method: req.method,
      path: req.path,
      action: 'Authorization',
      statusCode: 401,
      clientIp: req.clientIp,
    });

    return res.status(401).send({
      success: false,
      payload:
        'Sorry, You are not authorized to access this resource',
    });
  }
  static forwardAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/api/v1/');
    return next();
  }
}
module.exports = VerifyUser;
