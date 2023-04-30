const {v4: uuidv4} = require('uuid');
const {logger} = require('../utils/winstonLogger');

function logRequest(req, res, next) {
  const requestId = uuidv4();

  res.on('finish', () => {
    const statusCode = res.statusCode;
    logger.info('Incoming request', {
      requestId: requestId,
      userId: req.user ? req.user.user_id : null,
      path: req.path,
      clientIp: req.clientIp,
      action: req.method,
    });
  });

  res.setHeader('X-Request-Id', requestId);
  next();
}

module.exports = {logRequest};
