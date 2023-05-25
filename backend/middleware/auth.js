const {logger} = require('../utils/winstonLogger');

class VerifyUser {
  static ensureAuthenticated(req, res, next) {
    const requestId = res.getHeader('X-request-Id');

    if (req.isAuthenticated()) return next();
    logger.warn(`Authorization Error`, {
      module: 'auth.js',
      requestId: requestId,
      userId: req.user ? req.user.user_id : null,
      method: req.method,
      path: req.path,
      action: 'Authorization',
      statusCode: 403,
      clientIp: req.clientIp,
    });

    return res.status(401).send({
      success: false,
      payload:
        'Sorry, You are not authorized to access this resource',
    });
  }

  static isAdmin(req, res, next) {
    const requestId = res.getHeader('X-request-Id');

    const user = req.user;
    if (user?.user_role === 2003 || user[0]?.user_role === 2003)
      return next();

    logger.warn(`Authorization Error`, {
      module: 'auth.js',
      requestId: requestId,
      userId: req.user ? req.user.user_id : null,
      method: req.method,
      path: req.path,
      action: 'Authorization',
      statusCode: 403,
      clientIp: req.clientIp,
    });
    return res.status(403).json({
      success: false,
      payload: {
        message: 'You are not authorized to access this resource',
        redirectUrl: '/',
      },
    });
  }
  static isCustomer(req, res, next) {
    const requestId = res.getHeader('X-request-Id');

    const user = req.user;
    if (user?.user_role === 2001 || user?.[0]?.user_role === 2001)
      return next();

    logger.warn(`Authorization Error`, {
      module: 'auth.js',
      requestId: requestId,
      userId: req.user ? req.user.user_id : null,
      method: req.method,
      path: req.path,
      action: 'Authorization',
      statusCode: 403,
      clientIp: req.clientIp,
    });
    return res.status(403).json({
      success: false,
      payload: {
        message: 'You are not authorized to access this resource',
        redirectUrl: '/',
      },
    });
  }

  static forwardAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/api/v1/');
    return next();
  }
}
module.exports = VerifyUser;
