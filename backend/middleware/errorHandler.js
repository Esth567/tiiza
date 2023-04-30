const {logger} = require('../utils/winstonLogger');
const {CustomAPIError} = require('./customError');
const errorHandlerMiddleware = (err, req, res, next) => {
  const requestId = res.getHeader('X-request-Id');

  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({status: false, payload: err.message});
  }
  logger.error(`${err.message}`, {
    module: 'errorHandlerMiddleware.js',
    requestId: requestId,
    userId: req.user ? req.user.user_id : null,
    method: req.method,
    path: req.path,
    action: 'handle Error',
    statusCode: 500,
    clientIp: req.clientIp,
  });
  return res.status(500).json({payload: err.message});
};

module.exports = errorHandlerMiddleware;
